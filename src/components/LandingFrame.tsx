import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface LandingFrameProps {
  onExplore: () => void;
}

export function LandingFrame({ onExplore }: LandingFrameProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Disable scroll on landing page
    document.body.style.overflow = 'hidden';
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleExploreClick = () => {
    setIsTransitioning(true);
    // Trigger transition effects
    setTimeout(() => {
      onExplore();
    }, 1500);
  };

  // Calculate rotation based on mouse position
  const rotateX = (mousePosition.y - 0.5) * 10;
  const rotateY = (mousePosition.x - 0.5) * -10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-black"
    >
      {/* Spline 3D Robot Background - Interactive */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          perspective: '1000px',
        }}
        animate={{
          rotateX: rotateX * 0.5,
          rotateY: rotateY * 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{
            scale: isTransitioning ? 1.5 : 1,
            opacity: isTransitioning ? 0 : 1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <iframe 
            src="https://my.spline.design/r4xbot-nfmtYWcX8eMscoWf6vhEDrYQ/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            className="w-full h-full"
            style={{ 
              border: 'none',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
            }}
            title="3D Robot"
          />
          
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Dimming overlay when transitioning */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* White Flash Transition */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? [0, 1, 1, 0] : 0 }}
        transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Center Hero CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1, 
            y: isTransitioning ? -50 : 0,
            scale: isTransitioning ? 0.8 : 1,
          }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pointer-events-auto"
        >
          {/* Glassmorphism Button */}
          <motion.button
            onClick={handleExploreClick}
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/10 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Button container */}
            <div className="relative px-12 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden">
              {/* Inner glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative text-white tracking-widest">Explore</span>
            </div>

            {/* Hover ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/50"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{ scale: 1.15, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Optional subtitle text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/60 text-center mt-6 tracking-wide text-sm"
          >
            Discover My AI Projects
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />
    </motion.div>
  );
}