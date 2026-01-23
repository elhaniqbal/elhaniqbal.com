import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Gamepad2, Zap, Play, X, Code, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, forwardRef } from 'react';

interface TechCartridge {
  id: string;
  name: string;
  color: string;
  labelColor: string;
}

const TECH_CARTRIDGES: TechCartridge[] = [
  { id: 'React', name: 'REACT', color: '#61DAFB', labelColor: '#000000' },
  { id: 'TypeScript', name: 'TYPESCRIPT', color: '#3178C6', labelColor: '#FFFFFF' },
  { id: 'Python', name: 'PYTHON', color: '#FFD43B', labelColor: '#000000' },
  { id: 'Node.js', name: 'NODE.JS', color: '#68A063', labelColor: '#FFFFFF' },
  { id: 'Three.js', name: 'THREE.JS', color: '#000000', labelColor: '#FFFFFF' },
  { id: 'PostgreSQL', name: 'POSTGRESQL', color: '#336791', labelColor: '#FFFFFF' },
  { id: 'Redis', name: 'REDIS', color: '#DC382D', labelColor: '#FFFFFF' },
  { id: 'WebGL', name: 'WEBGL', color: '#990000', labelColor: '#FFFFFF' },
  { id: 'GraphQL', name: 'GRAPHQL', color: '#E10098', labelColor: '#FFFFFF' },
  { id: 'MongoDB', name: 'MONGODB', color: '#47A248', labelColor: '#FFFFFF' },
  { id: 'Docker', name: 'DOCKER', color: '#2496ED', labelColor: '#FFFFFF' },
  { id: 'AWS', name: 'AWS', color: '#FF9900', labelColor: '#000000' },
  { id: 'Vue.js', name: 'VUE.JS', color: '#4FC08D', labelColor: '#000000' },
  { id: 'Next.js', name: 'NEXT.JS', color: '#000000', labelColor: '#FFFFFF' },
  { id: 'TensorFlow', name: 'TENSORFLOW', color: '#FF6F00', labelColor: '#FFFFFF' },
  { id: 'Rust', name: 'RUST', color: '#CE422B', labelColor: '#FFFFFF' },
];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  awards?: string[];
  year: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "NEURAL_NETWORK_DASHBOARD",
    description: "Real-time AI analytics platform with predictive modeling and data visualization. Built for high-frequency data processing with WebGL rendering.",
    image: "https://images.unsplash.com/photo-1760433116983-76021bd32307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjgwODcwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["React", "TypeScript", "Three.js", "Python", "TensorFlow"],
    awards: ["Best Innovation 2025", "Tech Excellence Award"],
    year: "2025"
  },
  {
    id: 2,
    title: "CYBERDECK_OS",
    description: "Custom operating system interface with gesture controls and voice commands. Features modular plugin architecture and real-time collaboration.",
    image: "https://images.unsplash.com/photo-1641650265007-b2db704cd9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXxlbnwxfHx8fDE3NjgwNzk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["React", "TypeScript", "Node.js"],
    year: "2024"
  },
  {
    id: 3,
    title: "QUANTUM_TRADER",
    description: "Algorithmic trading platform with machine learning predictions. Processes millions of data points per second with sub-millisecond latency.",
    image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjgwNDE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Python", "React", "TypeScript", "PostgreSQL", "Redis"],
    awards: ["FinTech Innovation"],
    year: "2024"
  },
  {
    id: 4,
    title: "CLOUD_NEXUS",
    description: "Multi-cloud orchestration and deployment platform with automated scaling and cost optimization.",
    image: "https://images.unsplash.com/photo-1500185497267-d635f9c5e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMHN0YXJzfGVufDF8fHx8MTc2ODAwNjkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Docker", "AWS", "Node.js", "MongoDB", "GraphQL"],
    year: "2023"
  },
  {
    id: 5,
    title: "REALTIME_COLLAB",
    description: "Real-time collaborative workspace with WebRTC peer-to-peer communication and synchronized state management.",
    image: "https://images.unsplash.com/photo-1760433116983-76021bd32307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjgwODcwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Vue.js", "TypeScript", "WebGL", "Redis"],
    year: "2023"
  },
  {
    id: 6,
    title: "EDGE_COMPUTING_FRAMEWORK",
    description: "High-performance edge computing framework in Rust with zero-copy data processing and microsecond latency.",
    image: "https://images.unsplash.com/photo-1641650265007-b2db704cd9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXxlbnwxfHx8fDE3NjgwNzk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Rust", "Docker", "PostgreSQL"],
    awards: ["Performance Excellence"],
    year: "2022"
  },
];

interface TechDJMixerProps {
  // Component is now self-contained
}

export function TechDJMixer() {
  const [selectedCartridges, setSelectedCartridges] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDatashardCarousel, setShowDatashardCarousel] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [consoleGlow, setConsoleGlow] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Welcome animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCartridgeClick = (cartridgeId: string) => {
    if (selectedCartridges.includes(cartridgeId)) {
      setSelectedCartridges(selectedCartridges.filter(c => c !== cartridgeId));
    } else {
      setSelectedCartridges([...selectedCartridges, cartridgeId]);
    }
  };

  const handlePlay = () => {
    if (selectedCartridges.length === 0) return;

    setIsPlaying(true);
    setConsoleGlow(true);

    // Cartridge loading animation
    setTimeout(() => {
      const filtered = MOCK_PROJECTS.filter(project =>
        selectedCartridges.every(tech => project.techStack.includes(tech))
      );

      if (filtered.length > 0) {
        setFilteredProjects(filtered);
        setShowDatashardCarousel(true);
      }
      
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-b from-black via-indigo-950/30 to-black overflow-hidden">
      {/* Background effects */}
      <motion.div className="absolute inset-0" style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]) }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-fuchsia-400 mb-4" style={{ fontFamily: 'monospace' }}>
            &gt; CARTRIDGE_LOADER_
          </h2>
          <p className="text-cyan-300 text-lg mb-2" style={{ fontFamily: 'monospace' }}>
            :: SELECT TECH CARTRIDGES AND HIT PLAY
          </p>
          <div className="flex items-center justify-center gap-2">
            <Gamepad2 className="w-5 h-5 text-lime-400" />
            <p className="text-lime-400 text-sm" style={{ fontFamily: 'monospace' }}>
              {selectedCartridges.length > 0 
                ? `LOADED: ${selectedCartridges.join(' + ')}` 
                : 'NO CARTRIDGES LOADED'}
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 max-w-6xl mx-auto">
          {/* Mascot + Console */}
          <div className="relative flex flex-col items-center">
            {/* Mascot */}
            <AnimatePresence mode="wait">
              {showWelcome ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  className="mb-8"
                >
                  <GameMascotWelcome />
                </motion.div>
              ) : (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mb-8"
                >
                  <GameMascotPlaying isPlaying={isPlaying} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Retro Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Console body */}
              <div className="w-96 h-64 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-2xl border-4 border-gray-600 relative overflow-hidden">
                {/* Cartridge slot */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-16 bg-black border-4 border-gray-900 rounded-sm">
                  <div className="w-full h-full bg-gradient-to-b from-gray-950 to-black flex items-center justify-center">
                    {isPlaying ? (
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                        }}
                        className="text-lime-400 text-xs"
                        style={{ fontFamily: 'monospace' }}
                      >
                        LOADING...
                      </motion.div>
                    ) : selectedCartridges.length > 0 ? (
                      <div className="flex gap-1">
                        {selectedCartridges.slice(0, 3).map((cart, i) => {
                          const cartridge = TECH_CARTRIDGES.find(c => c.id === cart);
                          return (
                            <div
                              key={i}
                              className="w-8 h-12 rounded-sm border-2"
                              style={{
                                backgroundColor: cartridge?.color,
                                borderColor: cartridge?.labelColor,
                              }}
                            />
                          );
                        })}
                        {selectedCartridges.length > 3 && (
                          <div className="text-cyan-400 text-xs flex items-center">
                            +{selectedCartridges.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-600 text-xs" style={{ fontFamily: 'monospace' }}>
                        INSERT CARTRIDGE
                      </div>
                    )}
                  </div>
                </div>

                {/* Power LED */}
                <motion.div
                  className="absolute top-4 left-4 w-3 h-3 rounded-full"
                  animate={{
                    backgroundColor: consoleGlow ? '#00ff00' : '#ff0000',
                    boxShadow: consoleGlow 
                      ? '0 0 10px #00ff00' 
                      : '0 0 10px #ff0000',
                  }}
                />

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlay}
                  disabled={selectedCartridges.length === 0 || isPlaying}
                  className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 border-4 font-bold text-lg flex items-center gap-3 ${
                    selectedCartridges.length === 0 
                      ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-br from-lime-500 to-lime-700 border-lime-400 text-black hover:from-lime-400 hover:to-lime-600'
                  }`}
                  style={{ fontFamily: 'monospace' }}
                >
                  <Play className="w-6 h-6" fill="currentColor" />
                  {isPlaying ? 'LOADING...' : 'PLAY'}
                </motion.button>

                {/* Decorative vents */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-6 bg-gray-950 rounded-full" />
                  ))}
                </div>

                {/* Loading animation */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Console glow effect */}
              {consoleGlow && (
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Cartridge Collection - Scrollable */}
          <div className="relative w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'monospace' }}>
                  CARTRIDGE_LIBRARY
                </h3>
              </div>

              {/* Scrollable container */}
              <div className="max-h-[320px] sm:max-h-[420px] lg:max-h-[500px] overflow-y-auto pr-4 scrollbar-custom">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {TECH_CARTRIDGES.map((cartridge, index) => (
                    <GameCartridge
                      key={cartridge.id}
                      cartridge={cartridge}
                      isSelected={selectedCartridges.includes(cartridge.id)}
                      onClick={() => handleCartridgeClick(cartridge.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-2"
        >
          <p className="text-cyan-300 text-sm" style={{ fontFamily: 'monospace' }}>
            → CLICK CARTRIDGES TO SELECT TECH STACK
          </p>
          <p className="text-fuchsia-300 text-sm" style={{ fontFamily: 'monospace' }}>
            → HIT PLAY TO LOAD FILTERED PROJECTS
          </p>
        </motion.div>
      </div>

      {/* Datashard Carousel */}
      <AnimatePresence>
        {showDatashardCarousel && (
          <DatashardCarousel
            projects={filteredProjects}
            selectedTech={selectedCartridges}
            onClose={() => {
              setShowDatashardCarousel(false);
              setConsoleGlow(false);
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffff, #ff00ff);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}

// Game Cartridge Component
function GameCartridge({ 
  cartridge, 
  isSelected, 
  onClick,
  index 
}: { 
  cartridge: TechCartridge; 
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.02 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group"
    >
      {/* Cartridge body */}
      <div className={`relative w-full h-32 bg-gradient-to-b from-gray-800 to-gray-900 border-4 rounded-sm transition-all ${
        isSelected 
          ? 'border-cyan-400 shadow-lg shadow-cyan-500/50' 
          : 'border-gray-700'
      }`}>
        {/* Label area */}
        <div 
          className="absolute top-2 left-2 right-2 h-16 rounded-sm flex items-center justify-center p-2 border-2"
          style={{
            backgroundColor: cartridge.color,
            borderColor: cartridge.labelColor,
          }}
        >
          <span 
            className="font-bold text-center text-xs leading-tight break-words"
            style={{ 
              fontFamily: 'monospace',
              color: cartridge.labelColor,
            }}
          >
            {cartridge.name}
          </span>
        </div>

        {/* Connector pins */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-4 bg-yellow-600 rounded-sm" />
          ))}
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 w-8 h-8 bg-cyan-500 rounded-full border-4 border-black flex items-center justify-center z-10"
          >
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
          </motion.div>
        )}

        {/* Glow effect */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 255, 255, 0.5)',
                '0 0 20px rgba(0, 255, 255, 0.8)',
                '0 0 10px rgba(0, 255, 255, 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </div>
    </motion.button>
  );
}

// Game Mascot Welcome
function GameMascotWelcome() {
  return (
    <div className="relative w-32 h-32">
      {/* Retro pixel character */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        <div className="w-20 h-20 relative">
          {/* Simple pixel art style character */}
          <div className="absolute inset-0 bg-lime-400 rounded-lg border-4 border-lime-300">
            {/* Eyes */}
            <div className="absolute top-5 left-2 w-4 h-4 bg-black rounded-sm" />
            <div className="absolute top-5 right-2 w-4 h-4 bg-black rounded-sm" />
            {/* Mouth */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Waving hand */}
      <motion.div
        className="absolute top-8 -right-4 text-3xl"
        animate={{
          rotate: [0, 20, -20, 20, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      >
        👋
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black border-2 border-lime-400 px-4 py-2 rounded-lg whitespace-nowrap"
      >
        <p className="text-lime-400 text-xs" style={{ fontFamily: 'monospace' }}>
          READY PLAYER ONE!
        </p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-r-2 border-b-2 border-lime-400 rotate-45" />
      </motion.div>
    </div>
  );
}

// Game Mascot Playing
function GameMascotPlaying({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-32 h-32">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        animate={{
          rotate: isPlaying ? [-3, 3, -3] : 0,
        }}
        transition={{
          duration: 0.3,
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 bg-fuchsia-400 rounded-lg border-4 border-fuchsia-300">
            {/* Eyes */}
            <motion.div 
              className="absolute top-5 left-2 w-4 h-4 bg-black rounded-sm"
              animate={{
                scaleY: isPlaying ? [1, 0.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                repeat: isPlaying ? Infinity : 0,
              }}
            />
            <motion.div 
              className="absolute top-5 right-2 w-4 h-4 bg-black rounded-sm"
              animate={{
                scaleY: isPlaying ? [1, 0.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                repeat: isPlaying ? Infinity : 0,
              }}
            />
            {/* Mouth */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Controller in hands */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
        <Gamepad2 className="w-12 h-12 text-cyan-400" />
      </div>

      {/* Action particles */}
      {isPlaying && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lime-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, (i % 2 === 0 ? 20 : -20)],
                y: [0, (i < 2 ? -20 : 20)],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

// Datashard Carousel with Focus Effect
function DatashardCarousel({ 
  projects, 
  selectedTech,
  onClose 
}: { 
  projects: Project[];
  selectedTech: string[];
  onClose: () => void;
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handlePrevious = () => {
    setFocusedIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFocusedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-7xl relative" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute -top-16 right-0 w-12 h-12 bg-black border-2 border-fuchsia-400 text-fuchsia-400 flex items-center justify-center hover:bg-fuchsia-400 hover:text-black transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'monospace' }}>
            &gt; DATASHARD_LOADED_
          </h3>
          <p className="text-fuchsia-300 text-sm mb-2" style={{ fontFamily: 'monospace' }}>
            CARTRIDGES: {selectedTech.join(' + ')}
          </p>
          <p className="text-lime-400 text-sm" style={{ fontFamily: 'monospace' }}>
            {projects.length} PROJECT{projects.length !== 1 ? 'S' : ''} FOUND • {focusedIndex + 1} OF {projects.length}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-8">
          {/* Previous button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="w-12 h-12 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/40 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          {/* Cards container */}
          <div className="relative w-full max-w-5xl h-[420px] sm:h-[520px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => {
                const offset = index - focusedIndex;
                const isFocused = index === focusedIndex;
                
                return (
                  <DatashardCard
                    key={project.id}
                    project={project}
                    selectedTech={selectedTech}
                    offset={offset}
                    isFocused={isFocused}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-12 h-12 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/40 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Individual Datashard Card
function DatashardCard({ 
  project, 
  selectedTech,
  offset,
  isFocused 
}: { 
  project: Project;
  selectedTech: string[];
  offset: number;
  isFocused: boolean;
}) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        x: offset * 300,
        scale: isFocused ? 1 : 0.7,
        opacity: offset === 0 ? 1 : 0.3,
        filter: isFocused ? 'blur(0px)' : 'blur(4px)',
        zIndex: isFocused ? 10 : 1,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        pointerEvents: isFocused ? 'auto' : 'none',
      }}
    >
      <motion.div
        animate={{
          y: isFocused ? [0, -10, 0] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[280px] sm:w-[360px] lg:w-[500px]"
      >
        {/* Datashard shape with diagonal cuts */}
        <div 
          className="relative bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-500 p-[3px]"
          style={{
            clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
          }}
        >
          <div 
            className="w-full bg-gradient-to-br from-gray-900 via-purple-900/50 to-black p-8"
            style={{
              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
              boxShadow: '0 0 50px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(255, 0, 255, 0.3)',
            }}
          >
            {/* Image */}
            <div className="relative h-48 mb-6 overflow-hidden rounded-sm">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Year badge */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-cyan-500/30 border border-cyan-400 backdrop-blur-sm">
                <span className="text-cyan-300 text-xs" style={{ fontFamily: 'monospace' }}>{project.year}</span>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'monospace' }}>
              {project.title}
            </h4>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed h-20 overflow-hidden">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300" style={{ fontFamily: 'monospace' }}>TECH_STACK:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 text-xs border ${
                      selectedTech.includes(tech)
                        ? 'bg-fuchsia-500/30 border-fuchsia-400 text-fuchsia-200'
                        : 'bg-purple-900/50 border-purple-500/50 text-purple-300'
                    }`}
                    style={{ fontFamily: 'monospace' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-lime-400" />
                <span className="text-xs text-lime-300" style={{ fontFamily: 'monospace' }}>
                  {project.awards.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Corner accents */}
          {[
            { top: 0, left: 0, width: '20px', height: '3px' },
            { top: 0, left: 0, width: '3px', height: '20px' },
            { bottom: 0, right: 0, width: '20px', height: '3px' },
            { bottom: 0, right: 0, width: '3px', height: '20px' },
          ].map((style, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-400"
              style={style}
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}