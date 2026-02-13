"use client";

import { useEffect, useState } from "react";

export default function CalendarWidget() {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config/calendar")
      .then((res) => res.json())
      .then((data) => {
        setEmbedUrl(data.embedUrl || "");
        setStatus(data.embedUrl ? "Live availability" : "Add Google Calendar embed to Secret Manager");
      })
      .catch(() => setStatus("Calendar unavailable — add embed URL to Secret Manager"));
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#030a18] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">Schedule</p>
          <h3 className="font-heading text-xl text-mab-ivory">Google Calendar</h3>
        </div>
        <span className="text-xs text-mab-ivory/60">{status || "Loading..."}</span>
      </div>
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/30 min-h-[320px]">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="MAB AI Strategies availability"
            className="w-full h-[340px] border-0"
            loading="lazy"
            allow="clipboard-write; encrypted-media"
          />
        ) : (
          <div className="flex items-center justify-center h-[320px] text-mab-ivory/60 text-sm">
            Provide the Google Calendar embed URL via Secret Manager to render live scheduling.
          </div>
        )}
      </div>
    </div>
  );
}
