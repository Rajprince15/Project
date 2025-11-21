import { motion } from 'motion/react';

export function TransitionFrame() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* White flash overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.6, 1] }}
        className="absolute inset-0 bg-white z-20"
      />

      {/* Light tunnel animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 3, 5],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
            className="absolute w-96 h-96 rounded-full border-2 border-black/10"
          />
        ))}
      </div>

      {/* Parallax streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: '100%',
              opacity: 0
            }}
            animate={{ 
              y: '-100%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className="absolute w-0.5 h-32 bg-gradient-to-b from-transparent via-black/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Depth lines */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 2, 3],
          opacity: [0, 0.8, 0]
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 blur-2xl" />
      </motion.div>
    </motion.div>
  );
}
