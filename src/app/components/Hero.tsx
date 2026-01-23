import { motion } from 'motion/react';
import { siteContent } from '../../content';
import { Terminal, Zap, Code2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const [glitchText, setGlitchText] = useState("PORTFOLIO.EXE");
  const originalText = "PORTFOLIO.EXE";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const shouldGlitch = Math.random() > 0.7;
      
      if (shouldGlitch) {
        const glitched = originalText.split('').map(char => 
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" ref={sectionRef}>
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00ffff 1px, transparent 1px),
            linear-gradient(to bottom, #00ffff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Scan lines */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Terminal className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-fuchsia-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="w-12 h-12 text-lime-400" />
            </motion.div>
          </div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 relative"
            style={{
              fontFamily: 'monospace',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)',
            }}
          >
            <span className="text-cyan-400">&gt;</span>
            <span className="text-white mx-2">{glitchText}</span>
            <motion.span 
              className="text-fuchsia-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl text-cyan-300" style={{ fontFamily: 'monospace' }}>
              [CREATIVE DEVELOPER]
            </p>
            <p className="text-lg text-fuchsia-400" style={{ fontFamily: 'monospace' }}>
              :: Initializing cyberdeck...
            </p>
            <motion.p 
              className="text-lime-400 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontFamily: 'monospace' }}
            >
              SYSTEM READY ✓
            </motion.p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 transition-all text-center"
            style={{ fontFamily: 'monospace' }}
          >
            [ EXPLORE PROJECTS ]
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={siteContent.cvUrl}
            download
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 bg-fuchsia-500/20 border-2 border-fuchsia-400 text-fuchsia-300 hover:bg-fuchsia-500/30 transition-all text-center"
            style={{ fontFamily: 'monospace' }}
          >
            [ DOWNLOAD CV ]
          </motion.a>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-cyan-400 opacity-50" style={{ fontFamily: 'monospace' }}>
        <p className="text-xs">v2.077.2026</p>
      </div>
      <div className="absolute top-4 right-4 text-fuchsia-400 opacity-50" style={{ fontFamily: 'monospace' }}>
        <motion.p 
          className="text-xs"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ● REC
        </motion.p>
      </div>
      <div className="absolute bottom-4 left-4 text-lime-400 opacity-50" style={{ fontFamily: 'monospace' }}>
        <p className="text-xs">STATUS: ONLINE</p>
      </div>
    </section>
  );
}