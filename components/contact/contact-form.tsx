"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowUpRight, Mail } from "lucide-react";

interface InquiryResult {
  referenceId: string;
  whatsappUrl: string;
  mailtoUrl: string;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General & Stay Inquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InquiryResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Please check your details and try again.");
      } else {
        setResult({
          referenceId: data.referenceId,
          whatsappUrl: data.whatsappUrl,
          mailtoUrl: data.mailtoUrl,
        });
      }
    } catch {
      setError("Network error. Please try again or reach us directly by phone.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 sm:p-8 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D3F0DC] text-[#1E4629] text-xs font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Inquiry Logged &bull; Ref #{result.referenceId}</span>
        </div>

        <h3 className="font-editorial text-2xl font-normal text-[#171715]">
          Thank you for contacting City Boutique Hotel Sarajevo.
        </h3>

        <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.7]">
          Your message has been prepared for our 24/7 reception team. For an
          immediate reply from our front desk, you may also send this inquiry
          directly via our official WhatsApp concierge or email below:
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={result.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#171715] text-white pl-5 pr-2 py-2 text-xs font-medium hover:bg-[#2B2B28] transition-colors"
          >
            <span>Send Instantly via WhatsApp</span>
            <span className="w-7 h-7 rounded-full bg-white text-[#171715] flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href={result.mailtoUrl}
            className="inline-flex items-center gap-2 rounded-full border border-[#171715]/25 bg-white px-5 py-2.5 text-xs font-medium text-[#171715] hover:border-[#171715] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open in Email Client</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setResult(null);
            setMessage("");
          }}
          className="text-xs text-[#777773] hover:text-[#171715] underline underline-offset-4 cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 sm:p-8 space-y-5"
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-1">
          Direct Message
        </p>
        <h2 className="font-editorial text-2xl sm:text-[28px] font-normal text-[#171715]">
          Send an Inquiry to Reception
        </h2>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-[16px] bg-[#FADBD8]/70 border border-[#78281F]/20 text-xs text-[#78281F]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-medium text-[#171715] mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] placeholder:text-[#777773]/60 focus:outline-none focus:border-[#171715]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-medium text-[#171715] mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] placeholder:text-[#777773]/60 focus:outline-none focus:border-[#171715]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-medium text-[#171715] mb-1.5"
          >
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+387 / +90 / International"
            className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] placeholder:text-[#777773]/60 focus:outline-none focus:border-[#171715]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-medium text-[#171715] mb-1.5"
          >
            Topic
          </label>
          <select
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
          >
            <option value="Room Reservation Inquiry">
              Room Reservation Inquiry
            </option>
            <option value="Airport Transfer Request">
              Airport Transfer Request (SJJ)
            </option>
            <option value="Private Bosnia Tour Inquiry">
              Private Bosnia Tour (Sarajevo / Mostar / Travnik)
            </option>
            <option value="General & Stay Inquiry">
              General &amp; Stay Inquiry
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium text-[#171715] mb-1.5"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your preferred dates, number of guests, or any questions about Sarajevo..."
          className="w-full rounded-[14px] bg-white border border-[#E7E7E3] p-4 text-xs sm:text-[13px] text-[#171715] placeholder:text-[#777773]/60 focus:outline-none focus:border-[#171715]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-between gap-3 rounded-full bg-[#171715] text-white pl-6 pr-2 py-2 text-xs sm:text-[13px] font-medium hover:bg-[#2B2B28] transition-colors cursor-pointer disabled:opacity-50"
      >
        <span>{submitting ? "Sending Inquiry..." : "Send Inquiry"}</span>
        <span className="w-7 h-7 rounded-full bg-white text-[#171715] flex items-center justify-center">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </button>
    </form>
  );
}
