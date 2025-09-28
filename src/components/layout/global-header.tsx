import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '../auth/auth-button';
import { ThemeToggle } from '../theme-toggle';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';

export function GlobalHeader() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="sticky top-0 z-50"
    >
      <div className="relative">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0" />

        {/* Main content - thinner height */}
        <div className="relative flex items-center justify-between px-5 h-12">
          {/* Left section */}
          {user ? (
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center"
            >
              <SidebarTrigger className="h-8 w-8 text-text-primary rounded-md hover:bg-orange-50/40 transition-colors duration-200" />
              <img
                src="https://swankytools.com/logo.png"
                alt="SwankyTools"
                className="flex-shrink-0 mx-auto transition-all duration-300"
                style={{ width: '28px', height: '28px', marginLeft: '8px' }}
                loading="eager"
                decoding="async"
              />
            </motion.div>
          ) : (
            <div></div>
          )}

          {/* Right section */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* Promo ribbon removed */}
            <ThemeToggle />
            <AuthButton />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
