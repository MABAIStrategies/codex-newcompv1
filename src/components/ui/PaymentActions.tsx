"use client";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";

type PlanKey = "retainer" | "project";

const plans: Record<
  PlanKey,
  {
    label: string;
    description: string;
    amount: number;
  }
> = {
  retainer: {
    label: "Retainer Start",
    description: "Reserve the MAB AI Strategies pod for sustained sprints.",
    amount: 5000
  },
  project: {
    label: "Project Deposit",
    description: "Lock in a scoped outcome with a refundable QA checkpoint.",
    amount: 2500
  }
};

function PaymentForm({ plan }: { plan: PlanKey }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setStatus("Confirming secure payment via Stripe Elements...");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: typeof window !== "undefined" ? window.location.href : undefined
      },
      redirect: "if_required"
    });

    if (result.error) {
      setStatus(result.error.message || "Unable to confirm payment");
    } else {
      setStatus("Payment confirmed — we will send onboarding next.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: {
            billingDetails: { name: "", email: "" }
          }
        }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || isSubmitting}
        className="w-full rounded-xl bg-mab-gold text-mab-deep font-semibold py-3 shadow-glow hover:scale-[1.01] transition disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : plans[plan].label}
      </button>
      {status && <p className="text-sm text-mab-ivory/70">{status}</p>}
    </div>
  );
}

export default function PaymentActions() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("retainer");
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  useEffect(() => {
    fetch("/api/config/stripe-publishable")
      .then((res) => res.json())
      .then((data) => setPublishableKey(data.publishableKey))
      .catch(() => setServerMessage("Stripe publishable key missing — add it to Secret Manager."));
  }, []);

  useEffect(() => {
    if (!publishableKey) return;
    setClientSecret(null);
    setIsLoading(true);
    setServerMessage("Preparing PCI-compliant payment intent...");
    fetch("/api/payments/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: selectedPlan })
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setServerMessage("Ready — card data stays in Stripe Elements.");
      })
      .catch(() => {
        setClientSecret(null);
        setServerMessage("Unable to create payment intent. Confirm Stripe secrets.");
      })
      .finally(() => setIsLoading(false));
  }, [publishableKey, selectedPlan]);

  const options: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#D4AF37",
            colorText: "#F8F9FA"
          }
        }
      }
    : undefined;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1a30] to-[#000c1f] p-6 space-y-4 shadow-aurora">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-mab-gold">Stripe Elements</p>
          <h3 className="font-heading text-2xl text-mab-ivory">Engage instantly</h3>
        </div>
        <span className="text-xs text-mab-ivory/60">PCI compliant</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(plans) as PlanKey[]).map((key) => {
          const plan = plans[key];
          const active = selectedPlan === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPlan(key)}
              className={`rounded-2xl border px-4 py-3 text-left transition hover:border-mab-gold ${
                active ? "border-mab-gold bg-mab-gold/10 text-mab-ivory" : "border-white/10 text-mab-ivory/70"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.14em] text-mab-gold">{plan.label}</p>
              <p className="font-heading text-xl text-mab-ivory">${plan.amount.toLocaleString()}</p>
              <p className="text-xs text-mab-ivory/70">{plan.description}</p>
            </button>
          );
        })}
      </div>

      {serverMessage && <p className="text-xs text-mab-ivory/70">{serverMessage}</p>}

      {stripePromise && clientSecret && options && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm plan={selectedPlan} />
        </Elements>
      )}

      {isLoading && <p className="text-xs text-mab-ivory/60">Summoning Stripe intent...</p>}
    </div>
  );
}
