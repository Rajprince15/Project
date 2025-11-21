import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingFrame } from './components/LandingFrame';
import { TransitionFrame } from './components/TransitionFrame';
import { ProjectFrame } from './components/ProjectFrame';

export default function App() {
  const [showTransition, setShowTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleExplore = () => {
    setShowTransition(true);
    // Enable scrolling when entering projects
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setShowTransition(false);
      setShowContent(true);
    }, 2000);
  };

  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A revolutionary approach to digital experiences. Crafted with precision and attention to detail.",
      videoPlaceholder: "/videos/sample1.mp4",
      alignment: "left",
      theme: "light"
    },
    {
      id: 2,
      title: "Project Two",
      description: "Innovative solutions that push boundaries. Designed for the modern web.",
      videoPlaceholder: "/videos/sample2.mp4",
      alignment: "right",
      theme: "light"
    },
    {
      id: 3,
      title: "Project Three",
      description: "Where creativity meets functionality. A seamless blend of art and engineering.",
      videoPlaceholder: "/videos/sample3.mp4",
      alignment: "center",
      theme: "glass"
    },
    {
      id: 4,
      title: "Project Four",
      description: "Next-generation interfaces. Built for performance and beauty.",
      videoPlaceholder: "/videos/sample4.mp4",
      alignment: "left",
      theme: "dark"
    },
    {
      id: 5,
      title: "Project Five",
      description: "Pure elegance in every interaction. Minimal yet powerful.",
      videoPlaceholder: "/videos/sample5.mp4",
      alignment: "right",
      theme: "pure-white"
    },
    {
      id: 6,
      title: "Project Six",
      description: "The future of digital design. Holographic experiences reimagined.",
      videoPlaceholder: "/videos/sample6.mp4",
      alignment: "center",
      theme: "holographic"
    }
  ];

  useEffect(() => {
    if (!showContent) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      if (e.deltaY > 0 && currentProject < projects.length - 1) {
        // Scroll down
        setIsScrolling(true);
        setCurrentProject(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 600);
      } else if (e.deltaY < 0 && currentProject > 0) {
        // Scroll up
        setIsScrolling(true);
        setCurrentProject(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 600);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentProject < projects.length - 1) {
        e.preventDefault();
        setIsScrolling(true);
        setCurrentProject(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 600);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentProject > 0) {
        e.preventDefault();
        setIsScrolling(true);
        setCurrentProject(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 600);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showContent, currentProject, isScrolling, projects.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!showContent && !showTransition && (
          <LandingFrame key="landing" onExplore={handleExplore} />
        )}
        
        {showTransition && (
          <TransitionFrame key="transition" />
        )}
      </AnimatePresence>

      {showContent && (
        <div className="fixed inset-0">
          <AnimatePresence mode="wait">
            {projects[currentProject] && (
              <ProjectFrame
                key={projects[currentProject].id}
                {...projects[currentProject]}
                index={currentProject}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}