import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { TechDJMixer } from './components/TechDJMixer';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CoursesGalaxy } from './components/CoursesGalaxy';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      
      <ProjectsShowcase />
      
      <TechDJMixer />
      
      <ExperienceTimeline />
      
      <CoursesGalaxy />
      
      {/* Footer */}
      <footer className="relative py-12 bg-black border-t border-cyan-500/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-cyan-400" style={{ fontFamily: 'monospace' }}>
              SYSTEM.STATUS: ONLINE
            </p>
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'monospace' }}>
            © 2026 PORTFOLIO.EXE • BUILT WITH QUANTUM PRECISION
          </p>
          <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'monospace' }}>
            [REACT • TYPESCRIPT • MOTION • CREATIVITY]
          </p>
        </div>
      </footer>
    </div>
  );
}
