// src/pages/index.tsx
import { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router';
import {
  AgentModeToggle,
  type AgentMode,
} from '../components/agent-mode-toggle';
import { useAuthGuard } from '../hooks/useAuthGuard';

export default function Home() {
  const navigate = useNavigate();
  const { requireAuth } = useAuthGuard();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [agentMode, setAgentMode] = useState<AgentMode>('deterministic');

  // Rotating placeholder ideas
  const placeholderPhrases = useMemo(
    () => [
      'podcast show-notes generator with Stripe paywall',
      'AI resume screener for recruiters',
      'YouTube to blog post converter',
      'AI CRM for solo founders',
      'tweet thread generator from URLs',
    ],
    []
  );
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(true);

  const handleCreateApp = (query: string, mode: AgentMode) => {
    const q = query?.trim() || placeholderPhrases[i]; // fall back to current idea
    if (!q) return;

    const encodedQuery = encodeURIComponent(q);
    const encodedMode = encodeURIComponent(mode);
    const intendedUrl = `/chat/new?query=${encodedQuery}&agentMode=${encodedMode}`;

    if (
      !requireAuth({
        requireFullAuth: true,
        actionContext: 'to create applications',
        intendedUrl,
      })
    ) {
      return;
    }
    navigate(intendedUrl);
  };

  // Auto-resize textarea
  const resizeTextarea = () => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 300) + 'px';
  };
  useEffect(() => {
    resizeTextarea();
  }, []);

  // Typewriter effect for placeholder
  useEffect(() => {
    const phrase = placeholderPhrases[i] || '';
    if (typing) {
      if (typed.length < phrase.length) {
        const t = setTimeout(
          () => setTyped(phrase.slice(0, typed.length + 1)),
          60
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1200);
        return () => clearTimeout(t);
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setI((prev) => (prev + 1) % placeholderPhrases.length);
        setTyping(true);
      }
    }
  }, [typed, typing, i, placeholderPhrases]);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[120px] opacity-25"
        style={{ background: 'radial-gradient(600px 600px at center, var(--accent), transparent 70%)' }}
      />
      <section className="w-full max-w-5xl px-6 pt-20 md:pt-28 pb-12 md:pb-16">
        <h1 className="text-text-primary font-extrabold leading-[1.05] tracking-tight text-5xl md:text-7xl">
          Build your own <span className="text-accent">micro-SaaS</span> apps
          <br className="hidden md:block" /> in minutes.
        </h1>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-text-primary/70">
          Describe the idea → we scaffold the UI and backend. Export the code or host it here.
        </p>

        {/* Prompt card */}
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const query = textareaRef.current?.value || '';
            handleCreateApp(query, agentMode);
          }}
          className="mt-8 md:mt-10 rounded-2xl border border-accent/40 bg-bg-4/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="p-4 md:p-5">
            <div className="flex items-start gap-3">
              <textarea
                ref={textareaRef}
                name="query"
                aria-label="Describe the tool you want to build"
                placeholder={`e.g. ${typed}`}
                onInput={resizeTextarea}
                onChange={resizeTextarea}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const query = textareaRef.current?.value || '';
                    handleCreateApp(query, agentMode);
                  }
                }}
                className="flex-1 resize-none bg-transparent text-base md:text-lg text-text-primary placeholder:text-text-primary/50 outline-none min-h-[56px] md:min-h-[68px]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl px-4 py-3 text-sm font-semibold bg-accent text-black hover:brightness-110 transition"
              >
                <span className="inline-flex items-center gap-2">
                  Generate <ArrowRight size={16} />
                </span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              {import.meta.env.VITE_AGENT_MODE_ENABLED ? (
                <AgentModeToggle
                  value={agentMode}
                  onChange={setAgentMode}
                  className="flex-1"
                />
              ) : (
                <span />
              )}
              <div className="text-xs text-text-primary/55">
                Press <kbd className="px-1 py-0.5 rounded bg-bg-3 border border-white/10">Enter</kbd> to generate
              </div>
            </div>
          </div>
        </form>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            id="get-started"
            href="/auth/sign-in"
            className="rounded-xl px-5 py-3 text-sm font-semibold bg-accent text-black hover:brightness-110 transition"
          >
            Start free
          </a>
          <a
            href="/pricing.html"
            className="rounded-xl px-5 py-3 text-sm font-semibold border border-accent/40 text-text-primary hover:bg-bg-3 transition"
          >
            See pricing
          </a>
          <span className="text-text-primary/55 text-sm">No credit card required</span>
        </div>
      </section>
    </div>
  );
}
