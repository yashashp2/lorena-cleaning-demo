import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { business, services } from "../data";

type Values = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  service: string;
  property: string;
  date: string;
  details: string;
};
type Errors = Partial<Record<keyof Values, string>>;
const emptyValues: Values = {
  name: "",
  email: "",
  phone: "",
  postcode: "",
  service: "",
  property: "",
  date: "",
  details: "",
};
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function QuoteForm({
  selectedService,
}: {
  selectedService: { name: string; key: number };
}) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedService.name) {
      setValues((previous) => ({ ...previous, service: selectedService.name }));
      setErrors((previous) => ({ ...previous, service: undefined }));
      setSubmitted(false);
    }
  }, [selectedService]);
  useEffect(() => {
    if (submitted) confirmation.current?.focus();
  }, [submitted]);
  function update(field: keyof Values, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2)
      next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (
      !/^\+?[\d\s().-]+$/.test(values.phone.trim()) ||
      values.phone.replace(/\D/g, "").length < 10 ||
      values.phone.replace(/\D/g, "").length > 15
    )
      next.phone = "Please enter a valid telephone number.";
    if (
      !/^(GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i.test(
        values.postcode.trim(),
      )
    )
      next.postcode = "Please enter a valid UK postcode.";
    if (!values.service) next.service = "Please choose a cleaning service.";
    if (!values.property) next.property = "Please choose a property type.";
    if (values.date && values.date < localDate())
      next.date = "Please choose today or a future date.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setValues(emptyValues);
    setSubmitted(true);
  }
  const fieldProps = (field: keyof Values) => ({
    id: `quote-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `error-${field}` : undefined,
  });
  const error = (field: keyof Values) =>
    errors[field] ? (
      <span className="field-error" id={`error-${field}`}>
        {errors[field]}
      </span>
    ) : null;
  if (submitted)
    return (
      <div
        ref={confirmation}
        tabIndex={-1}
        role="status"
        className="quote-confirmation"
      >
        <span className="success-icon">
          <Check size={32} />
        </span>
        <span className="eyebrow">DEMONSTRATION COMPLETE</span>
        <h3>That’s how easy an enquiry could be.</h3>
        <p>
          This was a demonstration only. Your details have been cleared. Nothing
          was sent to Lorena, saved or booked.
        </p>
        <p>
          For a real quotation, contact Lorena directly on{" "}
          <a href={business.tel}>{business.phone}</a>.
        </p>
        <button
          className="button button-primary"
          onClick={() => setSubmitted(false)}
        >
          Try the form again <ArrowUpRight size={17} />
        </button>
      </div>
    );
  return (
    <form
      ref={form}
      className="quote-form"
      onSubmit={submit}
      noValidate
      autoComplete="off"
    >
      <div className="form-heading">
        <h3>A fresher space starts here.</h3>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="quote-name">Full name *</label>
          <input
            {...fieldProps("name")}
            required
            maxLength={100}
            placeholder="Your full name"
            onChange={(e) => update("name", e.target.value)}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="quote-email">Email *</label>
          <input
            {...fieldProps("email")}
            required
            type="email"
            maxLength={254}
            placeholder="you@example.com"
            onChange={(e) => update("email", e.target.value)}
          />
          {error("email")}
        </div>
        <div className="field">
          <label htmlFor="quote-phone">Telephone *</label>
          <input
            {...fieldProps("phone")}
            required
            type="tel"
            maxLength={25}
            placeholder="Your contact number"
            onChange={(e) => update("phone", e.target.value)}
          />
          {error("phone")}
        </div>
        <div className="field">
          <label htmlFor="quote-postcode">Postcode *</label>
          <input
            {...fieldProps("postcode")}
            required
            maxLength={9}
            placeholder="e.g. IG1 1AA"
            onChange={(e) => update("postcode", e.target.value)}
          />
          {error("postcode")}
        </div>
        <div className="field">
          <label htmlFor="quote-service">Cleaning service *</label>
          <select
            {...fieldProps("service")}
            required
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.name}>{service.name}</option>
            ))}
            <option>New-Build Property Cleaning</option>
            <option>Not sure — let’s discuss</option>
          </select>
          {error("service")}
        </div>
        <div className="field">
          <label htmlFor="quote-property">Property type *</label>
          <select
            {...fieldProps("property")}
            required
            onChange={(e) => update("property", e.target.value)}
          >
            <option value="">Select property type</option>
            <option>Flat / Apartment</option>
            <option>House</option>
            <option>Other — please describe below</option>
          </select>
          {error("property")}
        </div>
        <div className="field full-width">
          <label htmlFor="quote-date">
            Preferred date <span>(optional)</span>
          </label>
          <input
            {...fieldProps("date")}
            type="date"
            min={localDate()}
            onChange={(e) => update("date", e.target.value)}
          />
          <span className="field-hint">
            A preferred date is not a confirmed booking.
          </span>
          {error("date")}
        </div>
        <div className="field full-width">
          <label htmlFor="quote-details">
            Additional details <span>(optional)</span>
          </label>
          <textarea
            {...fieldProps("details")}
            rows={4}
            maxLength={2000}
            placeholder="Tell Lorena about your space, the number of rooms, or anything that needs extra attention…"
            onChange={(e) => update("details", e.target.value)}
          />
        </div>
      </div>
      <div className="demo-form-note" id="demo-form-note">
        <Info size={17} />
        <p>
          <strong>This is a demonstration form.</strong> Please use sample
          details. Nothing you enter is sent or stored. For a real enquiry, call
          or email Lorena directly.
        </p>
      </div>
      <button
        type="submit"
        className="button button-primary submit-button"
        aria-describedby="demo-form-note"
      >
        Preview Your Quote Request <ArrowUpRight size={18} />
      </button>
      <p className="form-footnote">
        Free, no-obligation quotations available by direct enquiry.
      </p>
    </form>
  );
}
