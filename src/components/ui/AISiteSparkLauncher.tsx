"use client";

import { useState } from "react";

export default function AISiteSparkLauncher() {
  const [company, setCompany] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const launch = async () => {
    setIsLaunching(true);
    setStatus("Pushing session to AI Site Spark webhook...");
    try {
      const res = await fetch("/api/ai-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, goal })
      });
      const data = await res.json();
      if (data.launchUrl) {
        setStatus("Session live — opening template builder.");
        window.open(data.launchUrl, "_blank", "noopener,noreferrer");
      } else {
        setStatus("Webhook responded without a launch link.");
      }
    } catch (error) {
      setStatus("Webhook unreachable. Try again shortly.");
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#030a18] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">AI Site Spark</p>
          <h3 className="font-heading text-xl text-mab-ivory">Initialize Custom Web Template</h3>
        </div>
        <span className="text-xs text-mab-ivory/60">Webhook powered</span>
      </div>
      <input
        type="text"
        placeholder="Company or product"
        className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <textarea
        placeholder="Goal for this experience"
        className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
        rows={3}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button
        type="button"
        onClick={launch}
        disabled={isLaunching}
        className="w-full rounded-xl bg-gradient-to-r from-mab-gold via-[#f1d27a] to-mab-gold text-mab-deep font-semibold py-3 shadow-glow hover:scale-[1.01] transition disabled:opacity-60"
      >
        {isLaunching ? "Launching..." : "Launch Template Session"}
      </button>
      {status && <p className="text-sm text-mab-ivory/70">{status}</p>}
    </div>
  );
}
