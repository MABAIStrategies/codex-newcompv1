"use client";

import Image from "next/image";
import { useState } from "react";

export default function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Routing to Webform3 and autoresponder...");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, goal })
      });
      if (res.ok) {
        setStatus("Captured — watch for the autoresponder and a live reply from Mark.");
        setName("");
        setEmail("");
        setPhone("");
        setGoal("");
      } else {
        setStatus("We could not capture your lead. Check required fields.");
      }
    } catch (error) {
      setStatus("Network hiccup — try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1a30] via-[#030a18] to-[#000c1f] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">Webform3</p>
          <h3 className="font-heading text-2xl text-mab-ivory">Capture + Autoresponder</h3>
        </div>
        <Image src="/logo.svg" alt="MAB AI Strategies logo" width={48} height={48} className="rounded-xl" />
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email (required)"
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Goals or automation wish list"
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-3"
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-mab-gold text-mab-deep font-semibold py-3 shadow-glow hover:scale-[1.01] transition disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit to Mark"}
        </button>
      </form>
      {status && <p className="text-sm text-mab-ivory/70">{status}</p>}

      <div className="flex items-center gap-3 border-t border-white/10 pt-3">
        <Image src="/headshot.svg" alt="Mark Bais" width={44} height={44} className="rounded-xl" />
        <div className="text-sm text-mab-ivory/70">
          <p className="font-semibold text-mab-ivory">Mark Bais</p>
          <p>Direct delivery to mark@mabaistrategies.com</p>
        </div>
      </div>
    </div>
  );
}
