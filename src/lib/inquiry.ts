import { z } from "zod";
import type { Dictionary } from "../locales/en";
import { property } from "../config/property";
export const todayLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export function inquirySchema(t: Dictionary) {
  const date = z
    .string()
    .refine(
      (v) =>
        /^\d{4}-\d{2}-\d{2}$/.test(v) &&
        !Number.isNaN(Date.parse(v)) &&
        new Date(v).toISOString().slice(0, 10) === v,
      t.errors.date,
    );
  return z
    .object({
      name: z.string().trim().min(1, t.errors.required),
      email: z.email(t.errors.email),
      phone: z.string().optional(),
      checkIn: date.refine((v) => v >= todayLocal(), t.errors.past),
      checkOut: date,
      adults: z
        .number({ error: t.errors.adults })
        .int(t.errors.adults)
        .min(1, t.errors.adults)
        .refine(
          (v) =>
            property.inquiry.maxAdults === null ||
            v <= property.inquiry.maxAdults,
          t.errors.limit,
        ),
      children: z
        .number({ error: t.errors.children })
        .int(t.errors.children)
        .min(0, t.errors.children)
        .refine(
          (v) =>
            property.inquiry.maxChildren === null ||
            v <= property.inquiry.maxChildren,
          t.errors.limit,
        ),
      message: z.string().trim().min(1, t.errors.required),
      consent: z.boolean().refine((v) => v, t.errors.consent),
    })
    .refine((v) => v.checkOut > v.checkIn, {
      message: t.errors.checkout,
      path: ["checkOut"],
    });
}
export type Inquiry = z.infer<ReturnType<typeof inquirySchema>>;
export interface InquiryAdapter {
  submit(
    inquiry: Inquiry,
  ): Promise<
    { status: "not-configured" } | { status: "sent"; reference: string }
  >;
}
export const inquiryAdapter: InquiryAdapter = {
  async submit() {
    return { status: "not-configured" };
  },
};
