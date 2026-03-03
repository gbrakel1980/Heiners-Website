import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "validation.nameMin"),
  company: z.string().optional(),
  email: z.string().email("validation.emailInvalid"),
  subject: z.string().min(5, "validation.subjectMin"),
  message: z
    .string()
    .min(20, "validation.messageMin")
    .max(2000, "validation.messageMax"),
  website: z.string().optional(), // honeypot — validated in API route, not here
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
