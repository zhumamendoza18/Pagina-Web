"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/types";
import { whatsappHref, telHref, emailHref } from "@/lib/contact";

type FieldName =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "projectType"
  | "message";

const REQUIRED: FieldName[] = ["name", "email", "message"];
const ORDER: FieldName[] = [
  "name",
  "company",
  "phone",
  "email",
  "projectType",
  "message",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyValues: Record<FieldName, string> = {
  name: "",
  company: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
};

interface QuoteFormProps {
  form: Dictionary["quoteForm"];
}

export function QuoteForm({ form }: QuoteFormProps) {
  const [values, setValues] = useState<Record<FieldName, string>>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submittedUnsent, setSubmittedUnsent] = useState(false);

  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = (): Partial<Record<FieldName, string>> => {
    const next: Partial<Record<FieldName, string>> = {};
    for (const field of REQUIRED) {
      if (!values[field].trim()) next[field] = form.errors.required;
    }
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = form.errors.email;
    }
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setSubmittedUnsent(false);
      const first = ORDER.find((field) => found[field]);
      if (first) document.getElementById(`qf-${first}`)?.focus();
      return;
    }

    // No backend yet: never fake a successful send.
    setSubmittedUnsent(true);
  };

  const describedBy = (name: FieldName) =>
    errors[name] ? `qf-${name}-error` : undefined;

  // text-base (16px) keeps iOS from zooming in on focus.
  const inputBase =
    "w-full rounded-md border bg-white px-3.5 py-3 text-base text-ccs-charcoal transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ccs-cyan";
  const borderFor = (name: FieldName) =>
    errors[name] ? "border-red-500" : "border-ccs-line focus:border-ccs-cyan";

  const labelClass = "mb-1.5 block text-sm font-medium text-ccs-charcoal";
  const optional = (
    <span className="font-normal text-ccs-gray"> {form.optionalLabel}</span>
  );

  const wa = whatsappHref();
  const tel = telHref();
  const mail = emailHref();

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
      <p className="flex items-start gap-2 rounded-md border border-ccs-line bg-ccs-light px-4 py-3 text-sm text-ccs-charcoal">
        <span aria-hidden="true" className="mt-0.5 font-bold text-ccs-cyan-dark">
          i
        </span>
        {form.notConnectedNote}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className={labelClass}>
            {form.fields.name}
          </label>
          <input
            id="qf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={describedBy("name")}
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={`${inputBase} ${borderFor("name")}`}
          />
          {errors.name && (
            <p id="qf-name-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="qf-company" className={labelClass}>
            {form.fields.company}
            {optional}
          </label>
          <input
            id="qf-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className={`${inputBase} ${borderFor("company")}`}
          />
        </div>

        <div>
          <label htmlFor="qf-phone" className={labelClass}>
            {form.fields.phone}
            {optional}
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={`${inputBase} ${borderFor("phone")}`}
          />
        </div>

        <div>
          <label htmlFor="qf-email" className={labelClass}>
            {form.fields.email}
          </label>
          <input
            id="qf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={`${inputBase} ${borderFor("email")}`}
          />
          {errors.email && (
            <p id="qf-email-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="qf-projectType" className={labelClass}>
            {form.fields.projectType}
            {optional}
          </label>
          <select
            id="qf-projectType"
            name="projectType"
            value={values.projectType}
            onChange={(e) => setField("projectType", e.target.value)}
            className={`${inputBase} ${borderFor("projectType")}`}
          >
            <option value="">{form.projectTypePlaceholder}</option>
            {form.projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="qf-message" className={labelClass}>
            {form.fields.message}
          </label>
          <textarea
            id="qf-message"
            name="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={describedBy("message")}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            className={`${inputBase} ${borderFor("message")} resize-y`}
          />
          {errors.message && (
            <p id="qf-message-error" role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 rounded-md border border-dashed border-ccs-line px-4 py-3 text-sm text-ccs-gray">
        {form.attachmentsNote}
      </p>

      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-ccs-cyan-dark px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-ccs-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ccs-cyan-dark sm:text-base"
        >
          {form.submit}
        </button>
      </div>

      {submittedUnsent && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-lg border border-ccs-line bg-ccs-light p-5"
        >
          <p className="font-semibold text-ccs-navy">{form.unsentTitle}</p>
          <p className="mt-1.5 text-sm text-ccs-charcoal/80">{form.unsentBody}</p>

          {(wa || tel || mail) && (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ccs-gray">
                {form.altChannels}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-ccs-navy underline underline-offset-2"
                  >
                    WhatsApp
                  </a>
                )}
                {tel && (
                  <a
                    href={tel}
                    className="text-sm font-semibold text-ccs-navy underline underline-offset-2"
                  >
                    {tel.replace("tel:", "")}
                  </a>
                )}
                {mail && (
                  <a
                    href={mail}
                    className="text-sm font-semibold text-ccs-navy underline underline-offset-2"
                  >
                    {mail.replace("mailto:", "")}
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </form>
  );
}
