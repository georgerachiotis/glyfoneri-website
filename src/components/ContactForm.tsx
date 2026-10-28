import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "../lib/i18n";
import {
  inquirySchema,
  inquiryAdapter,
  todayLocal,
  type Inquiry,
} from "../lib/inquiry";
export default function ContactForm() {
  const { t, path } = useLocale();
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema(t)),
    defaultValues: { adults: 1, children: 0, consent: false },
  });
  const fields = [
    "name",
    "email",
    "phone",
    "checkIn",
    "checkOut",
    "adults",
    "children",
    "message",
  ] as const;
  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        const result = await inquiryAdapter.submit(data);
        setChecked(result.status === "not-configured");
      })}
    >
      <h2>{t.formTitle}</h2>
      <p className="notice" id="form-unavailable">
        {t.formUnavailable}
      </p>
      <div className="form-grid">
        {fields.map((name) => {
          const number = name === "adults" || name === "children";
          const date = name === "checkIn" || name === "checkOut";
          return (
            <div
              className={`field ${name === "message" ? "wide" : ""}`}
              key={name}
            >
              <label htmlFor={name}>{t.fields[name]}</label>
              {name === "message" ? (
                <textarea
                  id={name}
                  {...register(name)}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
              ) : (
                <input
                  id={name}
                  type={
                    number
                      ? "number"
                      : date
                        ? "date"
                        : name === "email"
                          ? "email"
                          : name === "phone"
                            ? "tel"
                            : "text"
                  }
                  autoComplete={
                    name === "name"
                      ? "name"
                      : name === "email"
                        ? "email"
                        : name === "phone"
                          ? "tel"
                          : undefined
                  }
                  min={
                    number
                      ? name === "adults"
                        ? 1
                        : 0
                      : date
                        ? todayLocal()
                        : undefined
                  }
                  step={number ? 1 : undefined}
                  {...register(name, { valueAsNumber: number })}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
              )}{" "}
              {errors[name] && (
                <span id={`${name}-error`} className="error" role="alert">
                  {errors[name]?.message}
                </span>
              )}
            </div>
          );
        })}
        <div className="consent">
          <label>
            <input
              type="checkbox"
              {...register("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            {t.fields.consent}
          </label>{" "}
          <Link to={path("privacy")}>{t.legal[0]}</Link>
          {errors.consent && (
            <p id="consent-error" className="error" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>
      <button
        className="button form-submit"
        disabled={isSubmitting}
        aria-describedby="form-unavailable"
      >
        {t.validate}
      </button>
      {checked && (
        <p className="notice" role="status">
          {t.validated}
        </p>
      )}
    </form>
  );
}
