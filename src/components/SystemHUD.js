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
    <div className="fixed top-20 right-4 sm:top-4 sm:right-4 z-50 glass-panel border border-[#00f0ff]/30 bg-[#030712]/90 backdrop-blur-xl p-4 rounded-xl text-sm mono text-[#00f0ff] flex flex-col gap-3 w-60 sm:w-64 shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(0,240,255,0.4)] hover:border-[#00f0ff]/70 group">
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
