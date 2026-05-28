# TODO

## Legal & Compliance

- [ ] **Add business info to footer** — company name, CUI (fiscal code), address
  - Required by Romanian ANPC / commercial law (not GDPR)
  - Applies to all commercial websites operated in Romania

- [ ] **Create `/privacy` page** with GDPR-compliant Privacy Policy
  - Data collected: name, phone number
  - Purpose: appointment booking
  - Retention period (see task below)
  - User rights: access, rectification, deletion
  - Triggered by: BookingForm collects personal data

- [ ] **Update consent checkbox label** in `BookingForm.tsx` to link to the Privacy Policy page

- [ ] **Decide data retention period** for booking data and document it in the Privacy Policy
