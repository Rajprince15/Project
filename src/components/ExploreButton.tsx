import { motion } from 'motion/react';

interface ExploreButtonProps {
  onClick: () => void;
}

export function ExploreButton({ onClick }: ExploreButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Button */}
      <div className="relative px-12 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <span className="text-white tracking-wider">Explore</span>
      </div>

      {/* Hover ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/40"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
