// src/components/global/global-header.tsx
import { SidebarTrigger } from '@/components/ui/sidebar';
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
          {/* Left */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-8 w-8 text-text-primary rounded-md hover:bg-orange-50/40 transition-colors duration-200" />

            {/* Light-mode logo */}
            <img
              src="https://swankytools.com/logo.png"
              alt="SwankyTools"
              className="h-7 w-7 rounded-sm block dark:hidden"
              loading="eager"
              decoding="async"
            />
            {/* Dark-mode logo (use same URL for now if you don't have a dark variant yet) */}
            <img
              src="https://swankytools.com/logo-dark.png"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://swankytools.com/logo.png'; }}
              alt="SwankyTools"
              className="h-7 w-7 rounded-sm hidden dark:block"
              loading="eager"
              decoding="async"
            />

            <span className="text-text-primary/90 text-sm font-semibold tracking-wide">
              SwankyTools™ AI Builder
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a href="/pricing.html" className="text-sm opacity-80 hover:opacity-100">Pricing</a>
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
