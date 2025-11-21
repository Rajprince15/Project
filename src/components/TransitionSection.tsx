import { motion } from 'motion/react';
import { useEffect } from 'react';

interface TransitionSectionProps {
  onComplete: () => void;
}

export function TransitionSection({ onComplete }: TransitionSectionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* White flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 1] }}
        className="absolute inset-0 bg-white"
      />

      {/* Light tunnel effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20 rounded-full"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 3, 5],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.08,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Parallax streaks */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-white/40 to-transparent h-px"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`,
          }}
          initial={{ x: -200, opacity: 0 }}
          animate={{ 
            x: [0, 1000],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: 0.5 + (i * 0.03),
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{
          scale: [1, 2, 3],
          opacity: [0.3, 0.6, 0]
        }}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}
