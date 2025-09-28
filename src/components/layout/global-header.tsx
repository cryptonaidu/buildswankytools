// src/components/global/global-header.tsx
import { AuthButton } from '../auth/auth-button';
import { ThemeToggle } from '../theme-toggle';
import { motion } from 'framer-motion';

export function GlobalHeader() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="sticky top-0 z-50"
    >
      <div className="relative">
        <div className="absolute inset-0" />
        <div className="relative flex items-center justify-between px-5 h-14">
          {/* Left: logo + brand (no sidebar trigger) */}
          <a href="/" className="flex items-center gap-2">
            {/* Light-mode logo (dark text on light bg) */}
            <img
              src="https://swankytools.com/logo-dark.png"
              alt="SwankyTools"
              className="h-7 w-7 rounded-sm block dark:hidden"
              loading="eager"
              decoding="async"
              onError={(e) => {
                // fallback if you don't have logo-dark.png yet
                (e.currentTarget as HTMLImageElement).src = 'https://swankytools.com/logo.png';
              }}
            />
            {/* Dark-mode logo (light/white mark for dark bg).
               If you don't have a dedicated white logo, we invert the normal one. */}
            <img
              src="https://swankytools.com/logo-light.png"
              alt="SwankyTools"
              className="h-7 w-7 rounded-sm hidden dark:block"
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://swankytools.com/logo.png';
                (e.currentTarget as HTMLImageElement).style.filter = 'invert(1)';
              }}
            />
            <span className="text-text-primary/90 text-sm font-semibold tracking-wide">
              SwankyTools™ AI Builder
            </span>
          </a>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a href="/pricing.html" className="text-sm opacity-80 hover:opacity-100">
              Pricing
            </a>
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
