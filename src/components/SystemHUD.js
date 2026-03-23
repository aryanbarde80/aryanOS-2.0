"use client";
import { useState, useEffect } from 'react';
import { Cpu, Server, Activity, Database } from 'lucide-react';

export default function SystemHUD() {
  const [stats, setStats] = useState({ cpu: 14, ping: 12, threads: 104, mem: 42 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 15) + 10,
        ping: Math.floor(Math.random() * 8) + 8,
        threads: Math.floor(Math.random() * 20) + 90,
        mem: Math.floor(Math.random() * 5) + 40
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 glass-panel border border-[#00f0ff]/20 bg-[#030712]/60 backdrop-blur-md p-3 rounded text-xs mono text-[#00f0ff] hidden md:flex flex-col gap-2 w-52 shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:border-[#00f0ff]/50">
      <div className="flex justify-between items-center border-b border-[#00f0ff]/20 pb-2 mb-1">
        <span className="opacity-70 flex items-center gap-1"><Activity size={14} className="animate-pulse" /> SYS.STATUS</span>
        <span className="text-green-400 font-bold glitch-anim inline-block">OPTIMAL</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-1 opacity-70"><Cpu size={14} /> CPU_LOAD</span>
        <span>{stats.cpu}%</span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
        <div className="h-full bg-[#00f0ff] animate-pulse transition-all duration-500" style={{ width: `${stats.cpu}%` }}></div>
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="flex items-center gap-1 opacity-70"><Database size={14} /> MEM_ALLOC</span>
        <span>{stats.mem}%</span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
        <div className="h-full bg-[#ff003c] transition-all duration-500" style={{ width: `${stats.mem}%` }}></div>
      </div>

      <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#00f0ff]/20 opacity-80">
        <span className="flex items-center gap-1"><Server size={14} /> LATENCY</span>
        <span>{stats.ping}ms</span>
      </div>
      <div className="flex justify-between items-center opacity-80">
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> THREADS</span>
        <span>{stats.threads}</span>
      </div>
    </div>
  );
}
