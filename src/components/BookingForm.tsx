import { useState, type SyntheticEvent } from "react";

type Props = {
  whatsappE164: string;
  formspreeEndpoint: string;
};

const serviceOptions = [
  "Manichiură (clasică / semipermanentă)",
  "Unghii cu gel / construcție",
  "Nail Art",
  "Altele",
];

export default function BookingForm({
  whatsappE164,
  formspreeEndpoint,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const time = String(data.get("time") || "").trim();
    const message = String(data.get("message") || "").trim();
    const consent = data.get("consent");

    if (!name || !phone || !service || !date) {
      setError("Te rog completează câmpurile obligatorii.");
      return;
    }
    if (!consent) {
      setError("Te rog acceptă prelucrarea datelor pentru a continua.");
      return;
    }

    const lines = [
      `Bună Ana! Aș dori o programare.`,
      ``,
      `Nume: ${name}`,
      `Telefon: ${phone}`,
      `Serviciu: ${service}`,
      `Data: ${date}${time ? ` la ${time}` : ""}`,
      message ? `Mesaj: ${message}` : null,
    ].filter(Boolean);
    const waText = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${whatsappE164}?text=${waText}`;

    setSubmitting(true);
    // Send a backup email via Formspree (if configured). Fire-and-forget.
    if (
      formspreeEndpoint &&
      !formspreeEndpoint.includes("REPLACE_ME")
    ) {
      try {
        await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
      } catch {
        // ignore — WhatsApp is the primary channel
      }
    }

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener");
    setSubmitting(false);
    setDone(true);
    form.reset();
  }

  if (done) {
    return (
      <div className="card text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] flex items-center justify-center">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h3
          className="heading-md mt-4"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Cererea ta a fost trimisă!
        </h3>
        <p className="mt-3 text-[var(--color-on-surface-variant)]">
          Continuă conversația pe WhatsApp pentru a-ți confirma programarea.
          Dacă nu s-a deschis automat, apasă din nou butonul.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="btn btn-secondary mt-6"
        >
          Trimite o nouă cerere
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
      <div className="grid md:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
            Nume *
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Numele tău"
            className="input"
          />
        </label>

        <label className="block">
          <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
            Telefon *
          </span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="07XX XXX XXX"
            className="input"
          />
        </label>
      </div>

      <label className="block">
        <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
          Serviciu dorit *
        </span>
        <select name="service" required defaultValue="" className="input">
          <option value="" disabled>
            Alege un serviciu
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
            Data preferată *
          </span>
          <input type="date" name="date" required className="input" />
        </label>

        <label className="block">
          <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
            Ora preferată
          </span>
          <input type="time" name="time" className="input" />
        </label>
      </div>

      <label className="block">
        <span className="label-md uppercase text-[var(--color-on-surface-variant)] block mb-2">
          Mesaj (opțional)
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Vreo cerere specială?"
          className="input"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--color-on-surface-variant)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 w-4 h-4 accent-[var(--color-blush-deep)]"
        />
        <span>
          Sunt de acord cu prelucrarea datelor pentru a fi contactată pentru
          programare.
        </span>
      </label>

      {error && (
        <p
          className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] rounded-lg px-4 py-3"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-full md:w-auto"
      >
        {submitting ? "Se trimite…" : "Trimite cererea pe WhatsApp"}
      </button>

      <p className="text-xs text-[var(--color-on-surface-variant)]">
        Datele tale sunt folosite doar pentru a te contacta pentru programare.
      </p>
    </form>
  );
}
