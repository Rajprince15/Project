import { motion } from 'motion/react';
import { GlassButton } from './GlassButton';

interface LandingSectionProps {
  onExploreClick: () => void;
  isHidden: boolean;
}

export function LandingSection({ onExploreClick, isHidden }: LandingSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{ opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ pointerEvents: isHidden ? 'none' : 'auto' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <GlassButton onClick={onExploreClick}>
          Explore
        </GlassButton>
      </motion.div>
    </motion.section>
  );
}
