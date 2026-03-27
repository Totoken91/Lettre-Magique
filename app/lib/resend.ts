import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY non configurée");
    _resend = new Resend(key);
  }
  return _resend;
}

export function fromCourrier(): string {
  const email = process.env.RESEND_FROM_EMAIL_COURRIER;
  return email ? `LM Justice <${email}>` : "onboarding@resend.dev";
}

export function fromNoreply(): string {
  const email = process.env.RESEND_FROM_EMAIL_NOREPLY;
  return email ? `LM Justice <${email}>` : "onboarding@resend.dev";
}
