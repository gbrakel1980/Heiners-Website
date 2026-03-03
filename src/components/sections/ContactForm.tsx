"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { contactFormSchema, type ContactFormData } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  const messageValue = form.watch("message");
  const messageLength = messageValue?.length ?? 0;

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error(t("errorRateLimit"));
        } else if (response.status === 503) {
          toast.error(t("errorServiceDown"));
        } else {
          toast.error(result.error || t("errorGeneric"));
        }
        return;
      }

      toast.success(t("successMessage"));
      form.reset();
    } catch {
      toast.error(t("errorGeneric"));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Map Zod error codes to translated messages
  function getFieldError(fieldError: { message?: string } | undefined) {
    if (!fieldError?.message) return undefined;
    // The Zod schema stores translation keys as error messages
    try {
      return t(fieldError.message);
    } catch {
      return fieldError.message;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Honeypot field - hidden from users, traps bots */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            {...form.register("website")}
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-white/80">
                  {t("fields.name")} <span className="text-accent">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("placeholders.name")}
                    className="bg-surface-card border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-sm text-destructive mt-1">
                    {getFieldError(fieldState.error)}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">
                  {t("fields.company")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("placeholders.company")}
                    className="bg-surface-card border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-white/80">
                {t("fields.email")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("placeholders.email")}
                  className="bg-surface-card border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldError(fieldState.error)}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-white/80">
                {t("fields.subject")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("placeholders.subject")}
                  className="bg-surface-card border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldError(fieldState.error)}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-white/80">
                {t("fields.message")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("placeholders.message")}
                  rows={6}
                  className="bg-surface-card border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between mt-1">
                {fieldState.error ? (
                  <p className="text-sm text-destructive">
                    {getFieldError(fieldState.error)}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs ${
                    messageLength > 2000
                      ? "text-destructive"
                      : messageLength > 1800
                        ? "text-yellow-400"
                        : "text-white/40"
                  }`}
                >
                  {messageLength}/2000
                </span>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-primary font-semibold hover:bg-accent/90 h-11 text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("submitButton")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
