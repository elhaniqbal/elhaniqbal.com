import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  story: string;
  achievements: string[];
  color: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: "NEON_DYNAMICS_CORP",
    role: "Lead Cybernetic Engineer",
    location: "Neo Tokyo",
    period: "2024 - Present",
    story: "Joined as the founding engineer to build next-gen neural interfaces. Led a team of 12 developers in creating revolutionary brain-computer interface protocols. The project code-named 'Ghost Protocol' became the industry standard.",
    achievements: [
      "Architected scalable microservices handling 10M+ requests/day",
      "Reduced neural latency by 85% through optimization",
      "Mentored 6 junior engineers to senior positions"
    ],
    color: "cyan"
  },
  {
    id: 2,
    company: "QUANTUM_FLUX_LABS",
    role: "Senior Reality Developer",
    location: "Digital Underground",
    period: "2022 - 2024",
    story: "Pioneered the development of quantum-resistant encryption for augmented reality applications. Worked directly with the CTO to define technical strategy for the company's flagship product, reaching 500K active users.",
    achievements: [
      "Built AR framework adopted by 200+ enterprise clients",
      "Implemented CI/CD pipeline reducing deployment time by 90%",
      "Led security audit achieving SOC 2 compliance"
    ],
    color: "fuchsia"
  },
  {
    id: 3,
    company: "SYNTH_WAVE_STUDIOS",
    role: "Full-Stack Architect",
    location: "Retro City",
    period: "2020 - 2022",
    story: "Transformed legacy monolith into distributed microservices architecture. Introduced modern development practices including automated testing, containerization, and observability. The platform now powers experiences for millions of users daily.",
    achievements: [
      "Migrated 100+ services to Kubernetes with zero downtime",
      "Established engineering best practices and documentation",
      "Reduced infrastructure costs by 40% through optimization"
    ],
    color: "purple"
  },
  {
    id: 4,
    company: "STARTUP_NEXUS",
    role: "Founding Engineer",
    location: "Silicon Sector",
    period: "2018 - 2020",
    story: "Employee #3 at an early-stage startup. Built the entire product from scratch, handling everything from database design to frontend UX. The platform secured Series A funding and grew to 50K users in the first year.",
    achievements: [
      "Developed MVP in 3 months, leading to $2M seed funding",
      "Scaled platform from 0 to 50K users",
      "Established engineering culture and hiring processes"
    ],
    color: "lime"
  }
];

export function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      cyan: {
        border: 'border-cyan-400',
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        glow: 'shadow-cyan-500/50'
      },
      fuchsia: {
        border: 'border-fuchsia-400',
        bg: 'bg-fuchsia-500/20',
        text: 'text-fuchsia-400',
        glow: 'shadow-fuchsia-500/50'
      },
      purple: {
        border: 'border-purple-400',
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        glow: 'shadow-purple-500/50'
      },
      lime: {
        border: 'border-lime-400',
        bg: 'bg-lime-500/20',
        text: 'text-lime-400',
        glow: 'shadow-lime-500/50'
      }
    };
    return colors[color];
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden scroll-mt-16"
    >
      {/* Background grid */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'monospace' }}>
            &gt; CAREER_LOG_
          </h2>
          <p className="text-cyan-300 text-lg" style={{ fontFamily: 'monospace' }}>
            :: EXPERIENCE_TIMELINE
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-purple-500"></div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const colors = getColorClasses(exp.color);
              const isExpanded = expandedId === exp.id;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black z-10"
                    style={{
                      backgroundColor: colors.text.replace('text-', ''),
                      boxShadow: `0 0 20px ${colors.text.replace('text-', '')}`,
                    }}
                  />

                  {/* Content card */}
                  <motion.div
                    className={`w-full md:w-[calc(50%-3rem)] ml-12 sm:ml-20 md:ml-0 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div
                      className={`p-6 border-2 ${colors.border} ${colors.bg} backdrop-blur-sm cursor-pointer transition-all ${
                        isExpanded ? `shadow-2xl ${colors.glow}` : ''
                      }`}
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-2xl font-bold ${colors.text} mb-1`} style={{ fontFamily: 'monospace' }}>
                            {exp.company}
                          </h3>
                          <p className="text-white text-lg mb-2">{exp.role}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span style={{ fontFamily: 'monospace' }}>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span style={{ fontFamily: 'monospace' }}>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className={`w-6 h-6 ${colors.text}`} />
                        </motion.div>
                      </div>

                      {/* Story - always visible */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className={`w-4 h-4 ${colors.text}`} />
                          <span className={`text-sm ${colors.text}`} style={{ fontFamily: 'monospace' }}>
                            THE_STORY:
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {exp.story}
                        </p>
                      </div>

                      {/* Achievements - expandable */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-2 h-2 ${colors.bg} ${colors.border} border`} />
                            <span className={`text-sm ${colors.text}`} style={{ fontFamily: 'monospace' }}>
                              KEY_ACHIEVEMENTS:
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <span className={colors.text}>→</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    {/* Glitch effect corner */}
                    <motion.div
                      className={`absolute top-0 right-0 w-4 h-4 ${colors.bg} ${colors.border} border-2`}
                      animate={{
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center gap-8 flex-wrap"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'monospace' }}>6+</div>
            <div className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>YEARS_EXPERIENCE</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-fuchsia-400 mb-2" style={{ fontFamily: 'monospace' }}>50+</div>
            <div className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>PROJECTS_SHIPPED</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'monospace' }}>20+</div>
            <div className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>ENGINEERS_MENTORED</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}