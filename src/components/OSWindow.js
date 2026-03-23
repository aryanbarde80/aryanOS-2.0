"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Database, Hash } from 'lucide-react';

export default function OSWindow({ title, children, width = "max-w-4xl", icon = "📁" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [load, setLoad] = useState(12);
  const [mounted, setMounted] = useState(false);
  const reactId = React.useId();
  
  const windowId = useMemo(() => {
    if (!mounted) return "0x000000";
    // Generate a stable hex-like ID from the reactId
    return `0x${reactId.replace(/:/g, '').padEnd(6, '0').slice(0, 6).toUpperCase()}`;
  }, [reactId, mounted]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setLoad(prev => Math.min(Math.max(prev + (Math.random() * 10 - 5), 5), 95));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02, zIndex: 100 }}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-panel mx-auto w-full ${width} relative group transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] mb-4 sm:mb-6 rounded-lg cursor-grab active:cursor-grabbing border border-[#00f0ff]/10 hover:border-[#00f0ff]/60 bg-black/50 backdrop-blur-xl overflow-hidden`}
    >
      {/* Scanning Laser Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-[#00f0ff] opacity-40 blur-[2px] z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Cyber Noise: Tiny Hex IDs in corners */}
      <div className="absolute top-1 right-12 text-[7px] mono text-[#00f0ff]/30 pointer-events-none select-none hidden sm:block">
        <span className="mr-2">HASH: {windowId}</span>
        <span>STBL: 0.9997</span>
      </div>

      {/* Top bar */}
      <div className="flex border-b border-[#00f0ff]/30 p-2 sm:p-3 px-3 sm:px-4 items-center justify-between bg-[#030712]/95 rounded-t-[7px] relative z-30">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>
        
        <div className="flex flex-col items-center gap-1 text-[#00f0ff]/90 mono text-[11px] sm:text-xs tracking-widest uppercase font-bold truncate max-w-[70%] select-none header-font">
          <div className="flex items-center gap-2">
            <span className="shrink-0 scale-110">{icon}</span> <span className="truncate">{title}</span>
          </div>
          {/* Header Diagnostic Bar */}
          <div className="w-24 sm:w-32 h-1 bg-white/5 rounded-full overflow-hidden hidden md:block">
            <motion.div 
              animate={{ width: `${load}%` }}
              className={`h-full ${load > 80 ? 'bg-[#ff003c]' : 'bg-[#00f0ff]'} shadow-[0_0_10px_currentColor]`}
            />
          </div>
        </div>

        {/* Tail Diagnostic Stats */}
        <div className="flex items-center gap-4 text-[10px] mono text-gray-400 hidden lg:flex">
          <div className="flex items-center gap-1.5 hover:text-[#ffaa44] transition-colors">
            <Cpu size={12} className="text-[#ffaa44]" /> {load.toFixed(0)}%
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Database size={12} className="text-[#00f0ff]" /> {windowId.substring(0, 6)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-8 md:p-10 cursor-text relative z-10 leading-relaxed font-sans text-sm sm:text-base selection:bg-[#00f0ff]/30">
        {/* Subtle background code leak noise */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none font-mono text-[9px] p-4 leading-normal overflow-hidden">
          {Array(15).fill(`// sys.init("${windowId}"); await uplink.verify();`).join(' ')}
        </div>
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
