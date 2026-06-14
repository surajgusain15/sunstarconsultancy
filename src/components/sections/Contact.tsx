"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "";
const FORM_ENDPOINT = import.meta.env.PUBLIC_CONTACT_ENDPOINT || "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY || "";


interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  turnstile?: string;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ name: "", email: "", phone: "", message: "" });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldsVisible = fieldValues.name.trim() && fieldValues.email.trim() && fieldValues.phone.trim() && fieldValues.message.trim();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = document.querySelector('script[src*="turnstile"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => setTurnstileReady(true);
      document.body.appendChild(script);
    } else {
      setTurnstileReady(true);
    }
  }, []);

  useEffect(() => {
    if (!turnstileReady || !turnstileRef.current) return;
    if (widgetId.current) {
      (window as any).turnstile.remove(widgetId.current);
      widgetId.current = null;
    }
    if (!fieldsVisible) return;

    widgetId.current = (window as any).turnstile.render(turnstileRef.current, {
      sitekey: SITE_KEY,
      theme: "dark",
      callback: (token: string) => {
        setTurnstileToken(token);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.turnstile;
          return next;
        });
      },
      "expired-callback": () => {
        setTurnstileToken(null);
      },
      "error-callback": () => {
        setErrors((prev) => ({ ...prev, turnstile: "Security check failed. Please refresh and try again." }));
      },
    });

    return () => {
      if (widgetId.current && typeof (window as any).turnstile !== "undefined") {
        try {
          (window as any).turnstile.remove(widgetId.current);
        } catch {}
      }
    };
  }, [turnstileReady, fieldsVisible]);

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    const data = new FormData(formRef.current!);
    const name = (data.get("name") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const phone = (data.get("phone") as string || "").trim();
    const company = (data.get("company") as string || "").trim();
    const message = (data.get("message") as string || "").trim();
    if (!name || name.length > 50 || !/^[a-zA-Z\s\-'.]+$/.test(name)) errs.name = "Enter a valid name (letters only, max 50 characters)";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = "Enter a valid email address";
    if (!phone || !/^(\+91|0)?[6-9]\d{9}$/.test(phone)) errs.phone = "Enter a valid Indian phone number";
    if (company && company.length > 100) errs.company = "Company name is too long (max 100 characters)";
    if (!message || message.length < 10) errs.message = "Please enter at least 10 characters";
    if (!turnstileToken) errs.turnstile = "Please complete the security check";
    return errs;
  }, [turnstileToken]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    if (widgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
      (window as any).turnstile.reset(widgetId.current);
    }
  }, []);

  const revalidateAndResetTurnstile = useCallback(() => {
    const errs = validate();
    if (Object.keys(errs).length > 0 && turnstileToken) resetTurnstile();
  }, [validate, turnstileToken, resetTurnstile]);

  const handleFieldChange = useCallback((field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as keyof FormErrors];
      return next;
    });
    const value = (document.getElementById(field) as HTMLInputElement)?.value || "";
    const nextValues = { ...fieldValues, [field]: value };
    setFieldValues(nextValues);
    if (!(nextValues.name.trim() && nextValues.email.trim() && nextValues.phone.trim() && nextValues.message.trim()) && turnstileToken) {
      setTurnstileToken(null);
      if (widgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
        (window as any).turnstile.reset(widgetId.current);
      }
    }
    setTimeout(revalidateAndResetTurnstile, 0);
  }, [revalidateAndResetTurnstile, fieldValues, turnstileToken]);

  const handleSubmit = async () => {
    const form = formRef.current;
    if (!form) return;

    const hp = form.querySelector("#hp-field") as HTMLInputElement;
    if (hp?.value) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);

    try {
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
      data["cf-turnstile-response"] = turnstileToken || "";
      data["subject"] = `New Contact Form Submission from ${data.name}`;
      if (FORM_ENDPOINT.includes("web3forms")) {
        data["access_key"] = WEB3FORMS_KEY;
      }

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Form submission failed");

      setSubmitted(true);
      form.reset();
      setTurnstileToken(null);
      setFieldValues({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => resetTurnstile(), 100);
    } catch {
      setErrors((prev) => ({ ...prev, message: "Something went wrong. Please try again or email us directly." }));
    }
    setSending(false);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/60 transition-all placeholder:text-[var(--text-muted)] ${hasError ? "border-red-500/60" : "border-[var(--border)]"}`;

  useEffect(() => {
    if (submitted) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  return (
    <section id="contact" className="section-padding scroll-mt-20">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-4 block">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Let&apos;s Build Something <span className="gradient-text">Great Together</span></h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Ready to start your next project? Tell us about it and we will get back to you within 24 hours.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-[var(--text-muted)]">Email</div>
                    <a href="mailto:hello@sunstarconsultancy.in" className="text-sm hover:text-gold-400 transition-colors break-all">hello@sunstarconsultancy.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-muted)]">Phone</div>
                    <a href="tel:+919876543210" className="text-sm hover:text-gold-400 transition-colors">+91 98765 43210</a>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="primary" className="w-full" onClick={() => window.open("https://calendly.com/sunstarconsultancy", "_blank")}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
              Schedule a Call
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-3">
            <form ref={formRef} noValidate className="glass-card p-6 md:p-8 space-y-5">
              <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <input id="hp-field" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name <span className="text-gold-400">*</span></label>
                  <input id="name" name="name" required maxLength={50} className={fieldClass(!!errors.name)} placeholder="Your name" onChange={() => handleFieldChange("name")} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email <span className="text-gold-400">*</span></label>
                  <input id="email" name="email" type="email" required className={fieldClass(!!errors.email)} placeholder="you@company.com" onChange={() => handleFieldChange("email")} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone <span className="text-gold-400">*</span></label>
                <input id="phone" name="phone" type="tel" required className={fieldClass(!!errors.phone)} placeholder="+91 98765 43210" onChange={() => handleFieldChange("phone")} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                <input id="company" name="company" maxLength={100} className={fieldClass(!!errors.company)} placeholder="Company name" onChange={() => handleFieldChange("company")} />
                {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details <span className="text-gold-400">*</span></label>
                <textarea id="message" name="message" required rows={4} maxLength={1000} className={fieldClass(!!errors.message)} placeholder="Tell us about your project, goals, and timeline..." onChange={() => handleFieldChange("message")} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <div>
                <div ref={turnstileRef} className="flex justify-center min-h-[65px]" />
                {errors.turnstile && (
                  <div className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg px-3 py-2 mt-2">{errors.turnstile}</div>
                )}
              </div>
              {showSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-sm text-center bg-green-500/10 rounded-xl px-4 py-3 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Message sent successfully! We'll get back to you within 24 hours.
                </motion.div>
              )}
              {errors.message && errors.message.includes("try again") && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl px-4 py-3">{errors.message}</div>
              )}
              <button type="button" disabled={sending} onClick={handleSubmit}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] ${sending ? "opacity-60 cursor-not-allowed bg-gold-500/50 text-navy-900" : "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5"}`}>
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Sending...
                  </span>
                ) : (
                  <>Send Message<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

