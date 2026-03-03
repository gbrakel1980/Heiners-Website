import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Server-side validation
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, company, email, subject, message, website } = result.data;

    // Honeypot check: if the hidden field is filled, silently succeed
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL_TO;

    if (!resendApiKey || !contactEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL_TO environment variable");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    const emailBody = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BCC Contact Form <onboarding@resend.dev>",
        to: contactEmail,
        reply_to: email,
        subject: `[BCC Contact] ${subject}`,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
