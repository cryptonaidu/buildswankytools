// src/routes/pricing.tsx
import { useState } from 'react';
import { Check } from 'lucide-react';

const PRO_LINK =
  (import.meta as any).env?.VITE_RAZORPAY_PRO_LINK ?? '#';
const BUSINESS_LINK =
  (import.meta as any).env?.VITE_RAZORPAY_BUSINESS_LINK ?? '#';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const price = (m: number) => annual ? Math.round(m * 10) : m; // 2 months free on annual
  const suffix = annual ? ' / year' : ' / month';
  const note = annual ? 'Billed annually — 2 months free' : 'Billed monthly';

  return (
    <div className="w-full flex justify-center">
      <section className="w-full max-w-6xl px-6 pt-12 md:pt-16 pb-20">
        {/* Title row */}
        <div className="flex flex-wrap items-center gap-3">
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

        {/* Billing toggle */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${!annual ? 'bg-accent text-black border-accent' : 'border-accent/30 text-text-primary/80 hover:bg-bg-3'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${annual ? 'bg-accent text-black border-accent' : 'border-accent/30 text-text-primary/80 hover:bg-bg-3'}`}
          >
            Annual <span className="ml-1 opacity-80 text-xs">(2 months free)</span>
          </button>
          <span className="text-text-primary/55 text-sm">{note}</span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {/* Free */}
          <PlanCard
            name="Free"
            price={`₹0`}
            suffix=""
            description="Everything you need to try the builder."
            features={['Prompt-to-app builder', 'Basic templates', 'Community updates']}
            cta={{ href: '/', label: 'Start free', variant: 'outline' }}
          />

          {/* Pro (highlight) */}
          <PlanCard
            highlight
            name="Pro"
            price={`₹${price(499).toLocaleString('en-IN')}`}
            suffix={suffix}
            description="Publish faster with exports and pro templates."
            features={['Export generated code', 'Pro template catalog', 'Priority queue']}
            cta={{ href: PRO_LINK, label: 'Buy Pro', variant: 'primary' }}
          />

          {/* Business */}
          <PlanCard
            name="Business"
            price={`₹${price(1499).toLocaleString('en-IN')}`}
            suffix={suffix}
            description="For teams and white-label deployments."
            features={['Everything in Pro', 'White-label rights', 'Email support']}
            cta={{ href: BUSINESS_LINK, label: 'Buy Business', variant: 'primary' }}
          />
        </div>

        {/* Guarantee / footer copy */}
        <p className="mt-6 text-xs text-text-primary/55">
          7-day refund window on paid plans. Questions? <a className="underline hover:opacity-90" href="mailto:support@swankytools.com">support@swankytools.com</a>
        </p>
      </section>
    </div>
  );
}

function PlanCard({
  name,
  price,
  suffix,
  description,
  features,
  cta,
  highlight = false,
}: {
  name: string;
  price: string;
  suffix: string;
  description: string;
  features: string[];
  cta: { href: string; label: string; variant: 'primary' | 'outline' };
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 bg-bg-4 border ${
        highlight ? 'border-2 border-accent shadow-[0_0_0_1px_rgba(255,93,55,0.25)]' : 'border-accent/30'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent text-black text-xs font-extrabold px-2 py-1">
          Best value
        </span>
      )}
      <div className="text-sm font-bold uppercase tracking-wide opacity-80">{name}</div>
      <div className="mt-2">
        <span className="text-3xl font-extrabold">{price}</span>
        <span className="text-text-primary/65">{suffix}</span>
      </div>
      <p className="text-sm text-text-primary/65 mt-1">{description}</p>

      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-text-primary/90">
            <Check className="mt-0.5 size-4 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={cta.href}
        rel="nofollow"
        className={`inline-block mt-5 rounded-xl px-5 py-3 text-sm font-semibold transition ${
          cta.variant === 'primary'
            ? 'bg-accent text-black hover:brightness-110'
            : 'border border-accent/40 text-text-primary hover:bg-bg-3'
        }`}
      >
        {cta.label}
      </a>
    </div>
  );
}
