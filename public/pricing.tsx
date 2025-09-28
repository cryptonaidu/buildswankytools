// src/pages/pricing.tsx
import React from 'react';

const PRO_LINK =
  (import.meta as any).env?.VITE_RAZORPAY_PRO_LINK ?? '#';
const BUSINESS_LINK =
  (import.meta as any).env?.VITE_RAZORPAY_BUSINESS_LINK ?? '#';

export default function Pricing() {
  return (
    <div className="w-full flex justify-center">
      <section className="w-full max-w-5xl px-6 pt-12 md:pt-16 pb-20">
        <div className="flex items-center gap-3">
          <h1 className="text-text-primary font-extrabold tracking-tight text-4xl md:text-5xl">
            Pricing
          </h1>
          <span className="rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold px-3 py-1">
            Start free — upgrade anytime
          </span>
        </div>

        <p className="mt-3 text-text-primary/70 max-w-2xl">
          Unlock exports, pro templates and higher limits when you go Pro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {/* Free */}
          <div className="rounded-2xl border border-accent/30 bg-bg-4 p-6">
            <div className="text-sm font-bold uppercase tracking-wide opacity-80">Free</div>
            <div className="text-3xl font-extrabold mt-2">₹0</div>
            <p className="text-sm text-text-primary/65 mt-1">
              Everything you need to try the builder.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-1 text-text-primary/85">
              <li>Prompt-to-app builder</li>
              <li>Basic templates</li>
              <li>Community updates</li>
            </ul>
            <a
              href="/"
              className="inline-block mt-5 rounded-xl px-5 py-3 text-sm font-semibold border border-accent/40 text-text-primary hover:bg-bg-3 transition"
            >
              Start free
            </a>
          </div>

          {/* Pro (best value) */}
          <div className="relative rounded-2xl border-2 border-accent bg-bg-4 p-6">
            <span className="absolute -top-3 right-4 rounded-full bg-accent text-black text-xs font-extrabold px-2 py-1">
              Best value
            </span>
            <div className="text-sm font-bold uppercase tracking-wide opacity-80">Pro</div>
            <div className="text-3xl font-extrabold mt-2">₹499 / month</div>
            <p className="text-sm text-text-primary/65 mt-1">
              Publish faster with exports and pro templates.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-1 text-text-primary/85">
              <li>Export generated code</li>
              <li>Pro template catalog</li>
              <li>Priority queue</li>
            </ul>
            <a
              href={PRO_LINK}
              rel="nofollow"
              className="inline-block mt-5 rounded-xl px-5 py-3 text-sm font-semibold bg-accent text-black hover:brightness-110 transition"
            >
              Buy Pro
            </a>
          </div>

          {/* Business */}
          <div className="rounded-2xl border border-accent/30 bg-bg-4 p-6">
            <div className="text-sm font-bold uppercase tracking-wide opacity-80">Business</div>
            <div className="text-3xl font-extrabold mt-2">₹1499 / month</div>
            <p className="text-sm text-text-primary/65 mt-1">
              For teams and white-label deployments.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-1 text-text-primary/85">
              <li>Everything in Pro</li>
              <li>White-label rights</li>
              <li>Email support</li>
            </ul>
            <a
              href={BUSINESS_LINK}
              rel="nofollow"
              className="inline-block mt-5 rounded-xl px-5 py-3 text-sm font-semibold bg-accent text-black hover:brightness-110 transition"
            >
              Buy Business
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
