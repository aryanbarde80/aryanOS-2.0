"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OSWindow from './OSWindow';
import { Share2, Server, Database, Activity, Cpu, Zap, GitBranch, Cloud, Wifi, Shield } from 'lucide-react';

export default function SystemArchitectureNode() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.flow-line');
    gsap.fromTo(paths, 
      { strokeDashoffset: 1000, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 2, stagger: 0.2, ease: "power2.inOut", repeat: -1, repeatDelay: 1 }
    );
    
    // Animate pulse dots
    const pulses = svgRef.current.querySelectorAll('.pulse-dot');
    gsap.to(pulses, {
      scale: 1.5,
      opacity: 0,
      repeat: -1,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out"
    });
  }, []);

  const architectureLayers = [
    { layer: "PRESENTATION", items: ["React Dashboard", "Real-time WebSocket", "Mobile React Native"], color: "#818cf8" },
    { layer: "GATEWAY", items: ["KRP Load Balancer", "Rate Limiting", "JWT Validation"], color: "#f472b6" },
    { layer: "SERVICES", items: ["IoT Telemetry", "ML Inference", "User Management"], color: "#fb923c" },
    { layer: "DATA", items: ["PostgreSQL", "Redis Cache", "MongoDB"], color: "#818cf8" }
  ];

  return (
    <OSWindow title="System Architecture" icon={<Share2 size={16} className="text-[#818cf8]" />} width="max-w-5xl">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#818cf8]/20">
          <div className="flex items-center gap-2">
            <GitBranch size={12} className="text-[#818cf8]" />
            <span className="text-[9px] sm:text-[10px] mono text-gray-500">Architecture Diagram</span>
          </div>
          <div className="text-[9px] sm:text-[10px] mono text-[#818cf8] bg-[#818cf8]/10 px-2 py-0.5 rounded">
            v2.0 • Production
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Left: Diagram */}
          <div className="relative flex-1 min-w-0 border border-gray-800 bg-gradient-to-br from-[#030712] to-[#0a0f1a] rounded-xl p-4 overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[7px] sm:text-[8px] mono text-gray-500">Synced</span>
            </div>
            
            <svg ref={svgRef} viewBox="0 0 500 320" className="w-full h-auto max-h-[280px]">
              {/* Client Layer */}
              <rect x="20" y="40" width="80" height="70" rx="6" className="fill-[#818cf8]/10 stroke-[#818cf8] stroke-1.5" />
              <text x="60" y="70" textAnchor="middle" className="fill-[#818cf8] text-[8px] sm:text-[9px] mono font-bold">WEB_UI</text>
              <text x="60" y="88" textAnchor="middle" className="fill-gray-500 text-[7px] sm:text-[8px] mono">React/Next</text>
              <circle cx="60" cy="105" r="3" className="fill-[#818cf8] pulse-dot" />
              
              <rect x="20" y="125" width="80" height="70" rx="6" className="fill-[#818cf8]/10 stroke-[#818cf8] stroke-1.5" />
              <text x="60" y="155" textAnchor="middle" className="fill-[#818cf8] text-[8px] sm:text-[9px] mono font-bold">MOBILE</text>
              <text x="60" y="173" textAnchor="middle" className="fill-gray-500 text-[7px] sm:text-[8px] mono">React Native</text>
              <circle cx="60" cy="190" r="3" className="fill-[#818cf8] pulse-dot" />
              
              {/* Gateway Layer */}
              <rect x="140" y="70" width="100" height="100" rx="6" className="fill-[#f472b6]/10 stroke-[#f472b6] stroke-1.5" />
              <text x="190" y="95" textAnchor="middle" className="fill-[#f472b6] text-[9px] sm:text-[10px] mono font-bold">KRP_GATEWAY</text>
              <text x="190" y="115" textAnchor="middle" className="fill-gray-500 text-[7px] sm:text-[8px] mono">Load Balancer</text>
              <text x="190" y="130" textAnchor="middle" className="fill-gray-500 text-[7px] sm:text-[8px] mono">Rate Limiter</text>
              <text x="190" y="145" textAnchor="middle" className="fill-gray-500 text-[7px] sm:text-[8px] mono">JWT Auth</text>
              <circle cx="190" cy="165" r="3" className="fill-[#f472b6] pulse-dot" />
              
              {/* Service Layer */}
              <rect x="280" y="20" width="90" height="55" rx="4" className="fill-[#fb923c]/10 stroke-[#fb923c] stroke-1" />
              <text x="325" y="45" textAnchor="middle" className="fill-[#fb923c] text-[8px] mono font-bold">IOT_SVC</text>
              <text x="325" y="62" textAnchor="middle" className="fill-gray-500 text-[6px] mono">MQTT/ESP32</text>
              
              <rect x="280" y="90" width="90" height="55" rx="4" className="fill-[#fb923c]/10 stroke-[#fb923c] stroke-1" />
              <text x="325" y="115" textAnchor="middle" className="fill-[#fb923c] text-[8px] mono font-bold">ML_PROC</text>
              <text x="325" y="132" textAnchor="middle" className="fill-gray-500 text-[6px] mono">YOLOv8/CV</text>
              
              <rect x="280" y="160" width="90" height="55" rx="4" className="fill-[#fb923c]/10 stroke-[#fb923c] stroke-1" />
              <text x="325" y="185" textAnchor="middle" className="fill-[#fb923c] text-[8px] mono font-bold">USER_SVC</text>
              <text x="325" y="202" textAnchor="middle" className="fill-gray-500 text-[6px] mono">Auth/Profile</text>
              
              {/* Data Layer */}
              <rect x="410" y="40" width="70" height="50" rx="4" className="fill-[#818cf8]/10 stroke-[#818cf8] stroke-1" />
              <text x="445" y="60" textAnchor="middle" className="fill-[#818cf8] text-[8px] mono font-bold">PG SQL</text>
              <text x="445" y="78" textAnchor="middle" className="fill-gray-500 text-[6px] mono">Primary</text>
              
              <rect x="410" y="110" width="70" height="50" rx="4" className="fill-[#fb923c]/10 stroke-[#fb923c] stroke-1" />
              <text x="445" y="130" textAnchor="middle" className="fill-[#fb923c] text-[8px] mono font-bold">REDIS</text>
              <text x="445" y="148" textAnchor="middle" className="fill-gray-500 text-[6px] mono">Cache</text>
              
              <rect x="410" y="180" width="70" height="50" rx="4" className="fill-[#f472b6]/10 stroke-[#f472b6] stroke-1" />
              <text x="445" y="200" textAnchor="middle" className="fill-[#f472b6] text-[8px] mono font-bold">MONGODB</text>
              <text x="445" y="218" textAnchor="middle" className="fill-gray-500 text-[6px] mono">Analytics</text>
              
              {/* Connection Lines */}
              <path d="M100 75 L140 105" className="flow-line stroke-[#818cf8]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M100 160 L140 125" className="flow-line stroke-[#818cf8]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M240 120 L280 48" className="flow-line stroke-[#f472b6]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M240 120 L280 118" className="flow-line stroke-[#f472b6]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M240 120 L280 188" className="flow-line stroke-[#f472b6]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M370 48 L410 65" className="flow-line stroke-[#fb923c]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M370 118 L410 135" className="flow-line stroke-[#fb923c]/40 stroke-1 fill-none" strokeDasharray="800" />
              <path d="M370 188 L410 205" className="flow-line stroke-[#fb923c]/40 stroke-1 fill-none" strokeDasharray="800" />
            </svg>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-3 pt-2 border-t border-gray-800">
              <span className="flex items-center gap-1 text-[7px] mono text-gray-500"><div className="w-2 h-2 rounded-full bg-[#818cf8]"></div>PRESENTATION</span>
              <span className="flex items-center gap-1 text-[7px] mono text-gray-500"><div className="w-2 h-2 rounded-full bg-[#f472b6]"></div>GATEWAY</span>
              <span className="flex items-center gap-1 text-[7px] mono text-gray-500"><div className="w-2 h-2 rounded-full bg-[#fb923c]"></div>SERVICES</span>
              <span className="flex items-center gap-1 text-[7px] mono text-gray-500"><div className="w-2 h-2 rounded-full bg-[#818cf8]"></div>DATA</span>
            </div>
          </div>

          {/* Right: Technical Explanation */}
          <div className="flex-1 space-y-4 min-w-0">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[#818cf8]" />
                <h4 className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider">Architecture Overview</h4>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed">
                High-concurrency IoT & ML pipeline architecture designed for real-time telemetry and defect detection.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-[#f472b6]" />
                <h5 className="text-[10px] font-bold text-gray-300">PERFORMANCE METRICS</h5>
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2 text-[10px] sm:text-[11px]">
                  <span className="text-[#f472b6] font-bold">/01</span>
                  <span className="text-gray-400"><strong className="text-gray-200">KRP_GATEWAY:</strong> Custom load balancer handling 1,000+ concurrent requests with optimized round-robin implementation.</span>
                </li>
                <li className="flex gap-2 text-[10px] sm:text-[11px]">
                  <span className="text-[#f472b6] font-bold">/02</span>
                  <span className="text-gray-400"><strong className="text-gray-200">CACHE_LAYER:</strong> Redis-based query acceleration reducing API latency by <span className="text-[#818cf8] font-bold">40%</span> across IoT telemetry pipelines.</span>
                </li>
                <li className="flex gap-2 text-[10px] sm:text-[11px]">
                  <span className="text-[#f472b6] font-bold">/03</span>
                  <span className="text-gray-400"><strong className="text-gray-200">YOLOv8_EDGE:</strong> Distributed ML processing achieving <span className="text-[#818cf8] font-bold">95% accuracy</span> in manufacturing defect detection.</span>
                </li>
                <li className="flex gap-2 text-[10px] sm:text-[11px]">
                  <span className="text-[#f472b6] font-bold">/04</span>
                  <span className="text-gray-400"><strong className="text-gray-200">MQTT_BROKER:</strong> Real-time sensor data streaming with QoS Level 2 for guaranteed delivery.</span>
                </li>
              </ul>
            </div>
            
            {/* Architecture Layers Summary */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {architectureLayers.map((layer, idx) => (
                <div key={idx} className="p-2 border border-gray-800 rounded-lg">
                  <p className="text-[8px] font-bold" style={{ color: layer.color }}>{layer.layer}</p>
                  <p className="text-[7px] text-gray-600 truncate">{layer.items[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center gap-2 pt-2 text-[7px] sm:text-[8px] mono text-gray-600 border-t border-[#818cf8]/10">
          <span className="flex items-center gap-1">
            <Cloud size={8} className="text-[#818cf8]" />
            Deployed: AWS/GCP • Docker
          </span>
          <span className="flex items-center gap-1">
            <Shield size={8} className="text-[#fb923c]" />
            Security: JWT • Rate Limit • Encrypted
          </span>
          <span>
            Last sync: 2026
          </span>
        </div>
      </div>
    </OSWindow>
  );
}
