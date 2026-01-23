import { motion, useScroll, useTransform } from 'motion/react';
import { GraduationCap, X, Star } from 'lucide-react';
import { useState, useRef } from 'react';

interface Course {
  id: number;
  title: string;
  provider: string;
  year: string;
  description: string;
  skills: string[];
  position: { x: number; y: number };
  size: number;
  color: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "Advanced Machine Learning",
    provider: "Neural Academy",
    year: "2025",
    description: "Deep dive into neural networks, reinforcement learning, and computer vision. Built production ML pipelines handling real-time predictions.",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
    position: { x: 15, y: 20 },
    size: 80,
    color: "#00ffff"
  },
  {
    id: 2,
    title: "Quantum Computing Fundamentals",
    provider: "Quantum Institute",
    year: "2024",
    description: "Explored quantum algorithms, quantum cryptography, and quantum simulation. Implemented quantum circuits using Qiskit.",
    skills: ["Qiskit", "Quantum Algorithms", "Linear Algebra"],
    position: { x: 70, y: 15 },
    size: 65,
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "Cybersecurity & Ethical Hacking",
    provider: "CyberShield Academy",
    year: "2024",
    description: "Comprehensive penetration testing, network security, and vulnerability assessment. Certified ethical hacker.",
    skills: ["Penetration Testing", "Network Security", "Cryptography"],
    position: { x: 40, y: 50 },
    size: 70,
    color: "#ff6b00"
  },
  {
    id: 4,
    title: "Cloud Architecture Mastery",
    provider: "Cloud Dynamics",
    year: "2023",
    description: "Designed and deployed scalable cloud infrastructure. Mastered containerization, orchestration, and serverless architectures.",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
    position: { x: 75, y: 55 },
    size: 75,
    color: "#00ff00"
  },
  {
    id: 5,
    title: "3D Graphics & WebGL",
    provider: "Visual Arts Tech",
    year: "2023",
    description: "Created immersive 3D experiences for the web. Shader programming, physics simulation, and performance optimization.",
    skills: ["Three.js", "WebGL", "GLSL", "3D Math"],
    position: { x: 25, y: 75 },
    size: 60,
    color: "#9d00ff"
  },
  {
    id: 6,
    title: "Blockchain Development",
    provider: "Crypto Academy",
    year: "2022",
    description: "Smart contract development, DeFi protocols, and decentralized applications. Built and deployed multiple dApps on Ethereum.",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi"],
    position: { x: 60, y: 80 },
    size: 55,
    color: "#ffff00"
  },
  {
    id: 7,
    title: "System Design at Scale",
    provider: "Tech Giants Academy",
    year: "2022",
    description: "Architecture patterns for billion-user systems. Load balancing, caching strategies, and distributed databases.",
    skills: ["Microservices", "Redis", "PostgreSQL", "System Design"],
    position: { x: 50, y: 35 },
    size: 85,
    color: "#00d4ff"
  }
];

export function CoursesGalaxy() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const starOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-black overflow-hidden scroll-mt-16"
    >
      {/* Starfield background */}
      <motion.div className="absolute inset-0" style={{ opacity: starOpacity }}>
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-cyan-400" />
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: 'monospace' }}>
              &gt; KNOWLEDGE_GALAXY_
            </h2>
            <Star className="w-8 h-8 text-fuchsia-400" />
          </div>
          <p className="text-cyan-300 text-lg mb-2" style={{ fontFamily: 'monospace' }}>
            :: NAVIGATE THE LEARNING CONSTELLATION
          </p>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>
            Click on any celestial body to explore course details
          </p>
        </motion.div>

        {/* Galaxy Map */}
        <div className="relative max-w-6xl mx-auto h-[420px] sm:h-[520px] lg:h-[600px] border-2 border-cyan-500/30 bg-gradient-to-br from-indigo-950/30 to-purple-950/30 backdrop-blur-sm overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(to right, #00ffff 1px, transparent 1px),
                linear-gradient(to bottom, #00ffff 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}></div>
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {COURSES.map((course, i) => {
              const nextCourse = COURSES[(i + 1) % COURSES.length];
              return (
                <motion.line
                  key={`line-${course.id}`}
                  x1={`${course.position.x}%`}
                  y1={`${course.position.y}%`}
                  x2={`${nextCourse.position.x}%`}
                  y2={`${nextCourse.position.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                  viewport={{ once: true }}
                />
              );
            })}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#00ffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Course nodes */}
          {COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              className="absolute cursor-pointer"
              style={{
                left: `${course.position.x}%`,
                top: `${course.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(course.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedCourse(course)}
            >
              {/* Planet/Node */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
                animate={{
                  y: hoveredId === course.id ? -5 : 0,
                }}
              >
                {/* Orbit ring */}
                <motion.div
                  className="absolute rounded-full border-2 opacity-50"
                  style={{
                    width: course.size * 1.4,
                    height: course.size * 1.4,
                    borderColor: course.color,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Planet body */}
                <div
                  className="rounded-full relative overflow-hidden"
                  style={{
                    width: course.size,
                    height: course.size,
                    backgroundColor: course.color,
                    boxShadow: `0 0 30px ${course.color}, inset 0 0 20px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Surface texture */}
                  <div className="absolute inset-0 opacity-30" style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%)`,
                  }}></div>
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-1/2 h-1/2 text-black/70" />
                  </div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 ${hoveredId === course.id ? '40' : '20'}px ${course.color}`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Label on hover */}
                {hoveredId === course.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-black border-2 z-50"
                    style={{
                      borderColor: course.color,
                    }}
                  >
                    <p className="text-white text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                      {course.title}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Course info legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-cyan-300 text-sm" style={{ fontFamily: 'monospace' }}>
            {COURSES.length} COURSES COMPLETED • CONTINUOUS LEARNING TRAJECTORY
          </p>
        </motion.div>
      </div>

      {/* Course detail modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-gradient-to-br from-gray-900 to-black border-4 p-8 relative"
            style={{
              borderColor: selectedCourse.color,
              boxShadow: `0 0 50px ${selectedCourse.color}`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: selectedCourse.color,
                  boxShadow: `0 0 30px ${selectedCourse.color}`,
                }}
              >
                <GraduationCap className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>
                  {selectedCourse.title}
                </h3>
                <div className="flex gap-4 text-sm text-gray-400" style={{ fontFamily: 'monospace' }}>
                  <span>{selectedCourse.provider}</span>
                  <span>•</span>
                  <span>{selectedCourse.year}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div 
                className="text-sm mb-2 font-bold"
                style={{ 
                  fontFamily: 'monospace',
                  color: selectedCourse.color 
                }}
              >
                MISSION_LOG:
              </div>
              <p className="text-gray-300 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Skills */}
            <div>
              <div 
                className="text-sm mb-3 font-bold"
                style={{ 
                  fontFamily: 'monospace',
                  color: selectedCourse.color 
                }}
              >
                ACQUIRED_SKILLS:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 bg-white/10 border text-white text-sm"
                    style={{ 
                      borderColor: selectedCourse.color,
                      fontFamily: 'monospace' 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Decorative corners */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  ...pos,
                  backgroundColor: selectedCourse.color,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}