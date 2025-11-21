import { motion } from 'motion/react';
import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

interface ProjectFrameProps {
  id: number;
  title: string;
  description: string;
  videoPlaceholder: string;
  alignment: 'left' | 'right' | 'center';
  theme: 'light' | 'dark' | 'glass' | 'pure-white' | 'holographic';
  index: number;
}

export function ProjectFrame({
  title,
  description,
  videoPlaceholder,
  alignment,
  theme,
  index
}: ProjectFrameProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-800';
      case 'pure-white':
        return 'bg-white';
      case 'holographic':
        return 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20';
      case 'glass':
        return 'bg-gradient-to-br from-gray-50 to-gray-100';
      default:
        return 'bg-white';
    }
  };

  const getTextColor = () => {
    return theme === 'dark' || theme === 'holographic' ? 'text-white' : 'text-black';
  };

  const renderContent = () => {
    if (alignment === 'center') {
      return (
        <div className="flex flex-col items-center justify-center gap-12 h-full px-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center max-w-2xl z-10"
          >
            <h2 className={`mb-4 ${getTextColor()}`}>{title}</h2>
            <p className={`mb-8 ${getTextColor()} opacity-70`}>{description}</p>
            <CTAButtons theme={theme} />
          </motion.div>
        </div>
      );
    }

    const isLeft = alignment === 'left';

    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full px-8 lg:px-16 max-w-7xl mx-auto`}>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`space-y-6 z-10 ${isLeft ? '' : 'lg:order-2'}`}
        >
          <h2 className={getTextColor()}>{title}</h2>
          <p className={`${getTextColor()} opacity-70 max-w-lg`}>{description}</p>
          <CTAButtons theme={theme} />
        </motion.div>

        {/* Empty space for balance */}
        <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : 'lg:order-1'}`} />
      </div>
    );
  };

  return (
    <motion.section
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center ${getThemeClasses()}`}
      onMouseMove={handleMouseMove}
    >
      {/* Video Background */}
      <VideoBackground 
        videoPlaceholder={videoPlaceholder}
        mousePosition={mousePosition}
        theme={theme}
      />

      <FloatingParticles theme={theme} />
      
      {/* Holographic effects */}
      {theme === 'holographic' && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Dark theme neon accents */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        {renderContent()}
      </div>

      {/* Glass effects */}
      {theme === 'glass' && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-white/30 backdrop-blur-xl rounded-3xl rotate-12"
          />
          <motion.div
            animate={{
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-white/20 backdrop-blur-xl rounded-3xl -rotate-12"
          />
        </div>
      )}

      {/* Overlay gradient for readability */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'dark' || theme === 'holographic' 
          ? 'bg-black/30' 
          : 'bg-white/50'
      } backdrop-blur-[2px]`} />
    </motion.section>
  );
}

function VideoBackground({ 
  videoPlaceholder, 
  mousePosition,
  theme 
}: { 
  videoPlaceholder: string;
  mousePosition: { x: number; y: number };
  theme: string;
}) {
  const tiltX = (mousePosition.y - 0.5) * 2;
  const tiltY = (mousePosition.x - 0.5) * -2;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Video placeholder background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Simulated video content */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse" 
             style={{ animationDuration: '8s' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-red-500/20 to-yellow-500/20" />
        
        {/* Video label */}
        <div className="absolute bottom-8 right-8 text-white/30 text-xs backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          {videoPlaceholder}
        </div>

        {/* Cursor follow shine */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Animated shapes overlay */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"
      />
    </motion.div>
  );
}

function CTAButtons({ theme }: { theme: string }) {
  const isDark = theme === 'dark' || theme === 'holographic';
  
  return (
    <div className="flex flex-wrap gap-4">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative px-6 py-3 rounded-full ${
          isDark 
            ? 'bg-white text-black hover:bg-white/90' 
            : 'bg-black text-white hover:bg-black/90'
        } transition-all duration-300 flex items-center gap-2 shadow-lg`}
      >
        <ExternalLink className="w-4 h-4" />
        <span>Live Demo</span>
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isDark ? 'bg-white/20' : 'bg-black/20'
          } blur-xl opacity-0 group-hover:opacity-100 -z-10`}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative px-6 py-3 rounded-full ${
          isDark 
            ? 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20' 
            : 'bg-black/5 text-black backdrop-blur-md border border-black/10 hover:bg-black/10'
        } transition-all duration-300 flex items-center gap-2`}
      >
        <Github className="w-4 h-4" />
        <span>GitHub Repo</span>
      </motion.button>
    </div>
  );
}