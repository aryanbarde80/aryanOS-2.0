"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OSWindow from './OSWindow';
import { Activity, Cpu, Zap, Clock, Server, Database, Globe, TrendingUp, BarChart3, Gauge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceBenchmarks() {
  const containerRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState({});

  const benchmarks = [
    { label: "PageSpeed Score", value: 95, max: 100, unit: "/100", color: "#00f0ff", icon: Globe, category: "Web" },
    { label: "First Contentful Paint", value: 0.8, max: 3, unit: "s", color: "#00f0ff", icon: Clock, category: "Web" },
    { label: "Largest Contentful Paint", value: 1.2, max: 4, unit: "s", color: "#ffaa44", icon: Clock, category: "Web" },
    { label: "Time to Interactive", value: 1.5, max: 5, unit: "s", color: "#00f0ff", icon: Zap, category: "Web" },
    { label: "API Response Time", value: 45, max: 200, unit: "ms", color: "#ff003c", icon: Server, category: "Backend" },
    { label: "Database Query Avg", value: 12, max: 100, unit: "ms", color: "#ffaa44", icon: Database, category: "Backend" },
    { label: "Concurrent Users", value: 10, max: 10, unit: "K", color: "#00f0ff", icon: Activity, category: "Scale" },
    { label: "Uptime SLA", value: 99.9, max: 100, unit: "%", color: "#00f0ff", icon: TrendingUp, category: "Reliability" },
    { label: "Cache Hit Rate", value: 94, max: 100, unit: "%", color: "#ffaa44", icon: Zap, category: "Backend" },
    { label: "Bundle Size (Gzipped)", value: 142, max: 500, unit: "KB", color: "#ff003c", icon: Cpu, category: "Web" },
    { label: "Lighthouse Accessibility", value: 98, max: 100, unit: "/100", color: "#00f0ff", icon: Globe, category: "Web" },
    { label: "Test Coverage", value: 87, max: 100, unit: "%", color: "#ffaa44", icon: BarChart3, category: "Quality" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll('.benchmark-bar');
    gsap.fromTo(bars,
      { scaleX: 0, transformOrigin: 'left' },
      {
        scaleX: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true }
      }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const getPerformanceGrade = (value, max) => {
    const pct = (value / max) * 100;
    if (pct >= 90) return { grade: "A+", color: "#00f0ff" };
    if (pct >= 80) return { grade: "A", color: "#00f0ff" };
    if (pct >= 70) return { grade: "B", color: "#ffaa44" };
    return { grade: "C", color: "#ff003c" };
  };

  return (
    <OSWindow title="BENCHMARK/PERFORMANCE_METRICS.SYS" icon={<Gauge size={16} className="text-[#00f0ff] animate-pulse" />} width="max-w-6xl">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-[#00f0ff]/20">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-[#00f0ff]" />
            <span className="text-[9px] sm:text-[10px] mono text-gray-500">PERFORMANCE_BENCHMARKS</span>
          </div>
          <div className="flex gap-2 text-[9px] sm:text-[10px] mono">
            <span className="text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded">{benchmarks.length} METRICS</span>
            <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded">ALL PASSING</span>
          </div>
        </div>

        {/* Benchmarks Grid */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {benchmarks.map((b, idx) => {
            const Icon = b.icon;
            const pct = Math.min((b.value / b.max) * 100, 100);
            const isLowerBetter = b.unit === 's' || b.unit === 'ms' || b.unit === 'KB';
            const displayPct = isLowerBetter ? Math.max(100 - pct, 10) : pct;
            const { grade, color: gradeColor } = getPerformanceGrade(
              isLowerBetter ? (b.max - b.value) : b.value,
              b.max
            );

            return (
              <div key={idx} className="group p-3 border border-gray-800 hover:border-[#00f0ff]/40 rounded-lg bg-gradient-to-r from-[#030712] to-transparent hover:bg-[#00f0ff]/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={12} style={{ color: b.color }} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] sm:text-[10px] text-gray-400 group-hover:text-white transition-colors font-mono">
                      {b.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] mono px-1 py-0.5 rounded" style={{ backgroundColor: `${gradeColor}20`, color: gradeColor }}>
                      {grade}
                    </span>
                    <span className="text-xs font-bold font-mono" style={{ color: b.color }}>
                      {b.value}{b.unit}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="benchmark-bar h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${displayPct}%`,
                      backgroundColor: b.color,
                      boxShadow: `0 0 8px ${b.color}60`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[7px] text-gray-700 mono">{b.category}</span>
                  <span className="text-[7px] text-gray-700 mono">{displayPct.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-[#00f0ff]/20 flex flex-wrap justify-between items-center gap-3 text-[8px] sm:text-[9px] mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Zap size={10} className="text-[#00f0ff]" />
              <span className="text-gray-500">OVERALL: OPTIMIZED</span>
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={10} className="text-[#ffaa44]" />
              <span className="text-gray-500">GRADE: A+</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-600">ALL_BENCHMARKS_PASSING</span>
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
