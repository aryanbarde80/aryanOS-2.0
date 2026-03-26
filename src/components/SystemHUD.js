"use client";
import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Wifi, HardDrive, Zap, Shield, Clock, MemoryStick } from 'lucide-react';

export default function SystemHUD() {
  const [stats, setStats] = useState({
    cpu: 23,
    memory: 47,
    network: 99.7,
    uptime: 0,
    fps: 60,
    threads: 12
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(99, Math.max(5, prev.cpu + (Math.random() * 8 - 4))),
        memory: Math.min(85, Math.max(30, prev.memory + (Math.random() * 4 - 2))),
        network: Math.min(100, Math.max(95, prev.network + (Math.random() * 1 - 0.5))),
        uptime: prev.uptime + 1,
        fps: Math.min(120, Math.max(55, prev.fps + Math.floor(Math.random() * 6 - 3))),
        threads: prev.threads
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!visible) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-3 px-4 py-1.5 bg-black/70 backdrop-blur-md border border-[#00f0ff]/20 rounded-full text-[8px] mono text-gray-400 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <button onClick={() => setVisible(false)} className="text-gray-600 hover:text-[#ff003c] transition-colors mr-1" aria-label="Hide HUD">
        <Shield size={10} />
      </button>

      <div className="flex items-center gap-1">
        <Cpu size={10} className={stats.cpu > 70 ? 'text-[#ff003c]' : 'text-[#00f0ff]'} />
        <span>{stats.cpu.toFixed(0)}%</span>
      </div>

      <div className="w-px h-3 bg-gray-700" />

      <div className="flex items-center gap-1">
        <MemoryStick size={10} className="text-[#ffaa44]" />
        <span>{stats.memory.toFixed(0)}%</span>
      </div>

      <div className="w-px h-3 bg-gray-700" />

      <div className="flex items-center gap-1">
        <Wifi size={10} className="text-green-400" />
        <span>{stats.network.toFixed(1)}%</span>
      </div>

      <div className="w-px h-3 bg-gray-700" />

      <div className="flex items-center gap-1">
        <Zap size={10} className="text-[#00f0ff]" />
        <span>{stats.fps} FPS</span>
      </div>

      <div className="w-px h-3 bg-gray-700" />

      <div className="flex items-center gap-1">
        <Clock size={10} className="text-gray-500" />
        <span>{formatUptime(stats.uptime)}</span>
      </div>

      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
    </div>
  );
}
