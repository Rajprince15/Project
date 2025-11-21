import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'light' | 'dark';
}

export function GlassButton({ children, onClick, variant = 'light' }: GlassButtonProps) {
  const isDark = variant === 'dark';

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-2xl overflow-hidden
        ${isDark 
          ? 'bg-white/10 border-white/20 text-white' 
          : 'bg-black/5 border-black/10 text-black'
        }
        backdrop-blur-xl border
        flex items-center gap-2 justify-center
        transition-all duration-300
      `}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-r from-white/0 via-white/20 to-white/0' 
            : 'bg-gradient-to-r from-black/0 via-black/10 to-black/0'
        }`}
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6 }
        }}
      />

      {/* Shadow expansion on hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          isDark ? 'shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'shadow-[0_0_30px_rgba(0,0,0,0.2)]'
        }`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
