import { motion, useScroll, useTransform } from 'motion/react';
import { Award, ExternalLink, Code } from 'lucide-react';
import { useState, useRef } from 'react';

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
    techStack: ["React", "TypeScript", "Node.js", "WebRTC"],
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
    title: "HOLOGRAM_STUDIO",
    description: "3D content creation platform with AR/VR support. Enables real-time collaborative 3D modeling with physics simulation.",
    image: "https://images.unsplash.com/photo-1500185497267-d635f9c5e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMHN0YXJzfGVufDF8fHx8MTc2ODAwNjkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Three.js", "React", "TypeScript", "WebGL"],
    year: "2023"
  },
  {
    id: 5,
    title: "CLOUD_NEXUS",
    description: "Multi-cloud orchestration and deployment platform with automated scaling and cost optimization.",
    image: "https://images.unsplash.com/photo-1760433116983-76021bd32307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjgwODcwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Docker", "AWS", "Node.js", "GraphQL"],
    year: "2023"
  },
  {
    id: 6,
    title: "REALTIME_COLLAB",
    description: "Real-time collaborative workspace with WebRTC peer-to-peer communication and synchronized state management.",
    image: "https://images.unsplash.com/photo-1641650265007-b2db704cd9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXxlbnwxfHx8fDE3NjgwNzk0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    techStack: ["Vue.js", "TypeScript", "WebGL", "Redis"],
    year: "2023"
  }
];

export function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
      {/* Background effects with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #ff00ff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>
      </motion.div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          style={{ y }}
          className="mb-12"
        >
          <h2 className="text-5xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'monospace' }}>
            &gt; DATASHARDS_
          </h2>
          <p className="text-fuchsia-300 text-lg" style={{ fontFamily: 'monospace' }}>
            :: PROJECT_ARCHIVES
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal scrolling container */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-custom -mx-4 px-4 sm:mx-0 sm:px-0">
            {MOCK_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="snap-start flex-shrink-0 w-[320px] sm:w-[400px]"
              >
                <DatashardCard
                  project={project}
                  isSelected={selectedProject === project.id}
                  onSelect={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}

function DatashardCard({ project, isSelected, onSelect }: { 
  project: Project; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
      className="relative h-auto sm:h-[650px] min-h-[560px] cursor-pointer group"
    >
      {/* Datashard with diagonal cuts */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-500 p-[3px]"
        style={{
          clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
        }}
      >
        <div 
          className="w-full h-full bg-black overflow-hidden"
          style={{
            clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
          }}
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            {/* Year badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/30 border border-cyan-400 backdrop-blur-sm">
              <span className="text-cyan-300 text-xs" style={{ fontFamily: 'monospace' }}>{project.year}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3 flex flex-col flex-1 min-h-0">
            <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: 'monospace' }}>
              {project.title}
            </h3>

            <motion.div
              initial={false}
              animate={{ height: isSelected ? 'auto' : '60px' }}
              className="overflow-hidden flex-shrink-0"
            >
              <p className="text-sm text-cyan-200 leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-fuchsia-400" />
                <span className="text-xs text-fuchsia-300" style={{ fontFamily: 'monospace' }}>TECH_STACK:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-900/50 border border-purple-500/50 text-purple-300 text-xs"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-lime-400" />
                  <span className="text-xs text-lime-300" style={{ fontFamily: 'monospace' }}>AWARDS:</span>
                </div>
                <div className="space-y-1">
                  {project.awards.map((award, i) => (
                    <p key={i} className="text-xs text-lime-200 leading-tight" style={{ fontFamily: 'monospace' }}>
                      → {award}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* View button - stays at bottom */}
            <div className="mt-auto pt-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400 text-cyan-300 hover:border-fuchsia-400 hover:text-fuchsia-300 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'monospace' }}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">ACCESS_PROJECT</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(255, 0, 255, 0.2)',
          clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-fuchsia-400" />
    </motion.div>
  );
}
