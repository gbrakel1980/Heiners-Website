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
} from "@/components/ui/form";

const inputClassName =
  "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 transition-all duration-300 focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:border-accent/30 focus-visible:bg-white/[0.06] hover:border-white/15 hover:bg-white/[0.06]";

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

  function getFieldError(fieldError: { message?: string } | undefined) {
    if (!fieldError?.message) return undefined;
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
        className="space-y-6"
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white/70">
                  {t("fields.name")} <span className="text-accent">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("placeholders.name")}
                    className={inputClassName}
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
                <FormLabel className="text-sm font-medium text-white/70">
                  {t("fields.company")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("placeholders.company")}
                    className={inputClassName}
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
              <FormLabel className="text-sm font-medium text-white/70">
                {t("fields.email")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("placeholders.email")}
                  className={inputClassName}
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
              <FormLabel className="text-sm font-medium text-white/70">
                {t("fields.subject")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("placeholders.subject")}
                  className={inputClassName}
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
              <FormLabel className="text-sm font-medium text-white/70">
                {t("fields.message")} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("placeholders.message")}
                  rows={6}
                  className={`${inputClassName} resize-none`}
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
                  className={`text-xs tabular-nums ${
                    messageLength > 2000
                      ? "text-destructive"
                      : messageLength > 1800
                        ? "text-yellow-400"
                        : "text-white/30"
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
          className="group relative w-full overflow-hidden bg-accent text-primary font-semibold hover:bg-accent/90 h-12 text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
        >
          {/* Subtle shimmer effect on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                {t("submitButton")}
              </>
            )}
          </span>
        </Button>
      </form>
    </Form>
  );
}
