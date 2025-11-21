import { motion } from 'motion/react';

interface FloatingParticlesProps {
  theme: string;
}

export function FloatingParticles({ theme }: FloatingParticlesProps) {
  const isDark = theme === 'dark' || theme === 'holographic';
  const particleCount = theme === 'holographic' ? 30 : 15;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            theme === 'holographic' 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
              : isDark 
                ? 'bg-white/30' 
                : 'bg-black/10'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
