import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { GlassButton } from './GlassButton';
import { FloatingParticles } from './FloatingParticles';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectSectionProps {
  id: number;
  title: string;
  description: string;
  videoSrc: string;
  layout: 'left' | 'right' | 'center';
  theme: 'light' | 'dark' | 'glass' | 'pure' | 'holographic';
  index: number;
}

export function ProjectSection({
  title,
  description,
  videoSrc,
  layout,
  theme,
  index
}: ProjectSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-black text-white';
      case 'glass':
        return 'bg-gradient-to-br from-gray-50 to-gray-100';
      case 'pure':
        return 'bg-white text-black';
      case 'holographic':
        return 'bg-gradient-to-br from-black via-purple-950 to-black text-white';
      default:
        return 'bg-white text-black';
    }
  };

  const renderContent = () => {
    const videoElement = (
      <motion.div
        className="relative group"
        style={{ y: layout === 'center' ? 0 : y }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-2xl">
          {/* Video container */}
          <motion.div
            animate={{
              rotateY: isHovered ? 5 : 0,
              rotateX: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative aspect-video bg-gray-900/50 backdrop-blur-xl border border-white/10"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            
            {/* Cursor follow shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: isHovered
                  ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)'
                  : 'none'
              }}
            />
          </motion.div>

          {/* Glass overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl pointer-events-none"
          />
        </div>
      </motion.div>
    );

    const textElement = (
      <motion.div
        style={{ opacity, scale }}
        className="flex flex-col gap-6 z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={theme === 'dark' || theme === 'holographic' ? 'text-white' : 'text-black'}
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={`max-w-md ${
            theme === 'dark' || theme === 'holographic' 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          <GlassButton variant={theme === 'dark' || theme === 'holographic' ? 'dark' : 'light'}>
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </GlassButton>
          <GlassButton variant={theme === 'dark' || theme === 'holographic' ? 'dark' : 'light'}>
            <Github className="w-4 h-4" />
            GitHub Repo
          </GlassButton>
        </motion.div>
      </motion.div>
    );

    if (layout === 'center') {
      return (
        <div className="flex flex-col items-center justify-center gap-12 max-w-6xl mx-auto px-8">
          <div className="w-full max-w-4xl">
            {videoElement}
          </div>
          <div className="text-center max-w-2xl">
            {textElement}
          </div>
        </div>
      );
    }

    if (layout === 'right') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-8">
          <div>{textElement}</div>
          <div>{videoElement}</div>
        </div>
      );
    }

    // left layout
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-8">
        <div>{videoElement}</div>
        <div>{textElement}</div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className={`relative snap-start w-full min-h-screen flex items-center justify-center ${getThemeClasses()}`}
    >
      {/* Background effects */}
      {theme === 'holographic' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </>
      )}

      {theme === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
      )}

      {/* Floating particles */}
      <FloatingParticles 
        count={theme === 'holographic' ? 30 : 15}
        color={theme === 'dark' || theme === 'holographic' ? 'white' : 'black'}
      />

      {/* Content */}
      <div className="relative w-full py-20">
        {renderContent()}
      </div>

      {/* Glass panels for glass theme */}
      {theme === 'glass' && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-48 h-48 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </>
      )}

      {/* 3D depth layers for holographic */}
      {theme === 'holographic' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-cyan-500/10 rounded-[40px]"
              style={{
                margin: `${(i + 1) * 20}px`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
