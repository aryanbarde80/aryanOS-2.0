"use client";
import { useState, useEffect } from 'react';
import { Terminal, Fingerprint, Orbit } from 'lucide-react';

export default function TerminalHero() {
  const [text, setText] = useState('');
  const [isReady, setIsReady] = useState(false);
  
  const fullText = "> INITIALIZING AGENTIC PROFILE...\n> USER: ARYAN BARDE\n> ROLE: FULL-STACK ENGINEER | IOT SPECIALIST | AI DEVELOPER\n> STATUS: ONLINE & READY FOR DEPLOYMENT_";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(typingInterval);
        setIsReady(true);
      }
    }, 35); // Fast typing speed
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="glass-panel w-full max-w-4xl mx-auto neon-border relative overflow-hidden group mb-12 mt-8">
      {/* Top OS Bar */}
      <div className="flex border-b border-[#00f0ff]/30 p-2 px-4 items-center gap-3 bg-[#030712]/80">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="text-xs text-[#00f0ff]/60 mono flex items-center gap-2">
          <Terminal size={14} /> 
          <span>admin@system: ~/portfolio/boot</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[#ff003c]/60">
          <Fingerprint size={16} className="animate-pulse" />
        </div>
      </div>

      <div className="p-6">
        <div className="mono text-sm sm:text-base md:text-lg neon-text whitespace-pre-line min-h-[140px] leading-relaxed relative">
          {text}
          <span className="inline-block w-2.5 h-[1em] bg-[#00f0ff] animate-pulse ml-0.5 align-middle shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
        </div>
        
        {isReady && (
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 animate-in fade-in duration-700 justify-between items-center relative z-10">
            <div className="flex flex-wrap gap-4">
              <button className="relative overflow-hidden px-6 py-2 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all duration-300 mono text-sm flex items-center gap-2 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] group">
                <span className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[#00f0ff]/30 to-transparent -translate-y-full group-hover:animate-[scanner_1.5s_ease-in-out_infinite]"></span>
                <span className="relative z-10">[ EXECUTE: VIEW_SKILLS ]</span>
              </button>
              <button className="relative overflow-hidden px-6 py-2 border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c]/20 transition-all duration-300 mono text-sm shadow-[0_0_10px_rgba(255,0,60,0.2)] hover:shadow-[0_0_20px_rgba(255,0,60,0.4)] group">
                <span className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[#ff003c]/30 to-transparent -translate-y-full group-hover:animate-[scanner_1.5s_ease-in-out_infinite]"></span>
                <span className="relative z-10">[ EXECUTE: INITIATE_CONTACT ]</span>
              </button>
            </div>
            <div className="hidden md:flex opacity-20 hover:opacity-100 transition-opacity duration-500 items-center justify-center">
              <Orbit size={80} className="text-[#00f0ff] animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
