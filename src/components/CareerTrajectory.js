"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OSWindow from './OSWindow';
import { TrendingUp, Briefcase, GraduationCap, Award, Code, Rocket, Star, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CareerTrajectory() {
  const timelineRef = useRef(null);

  const milestones = [
    {
      year: "2022",
      month: "Nov",
      title: "Started B.Tech in CSE",
      org: "GGITS, Jabalpur",
      type: "education",
      icon: GraduationCap,
      color: "#818cf8",
      desc: "Began Bachelor of Technology in Computer Science & Engineering with CGPA 8.14/10"
    },
    {
      year: "2023",
      month: "Jul",
      title: "Cybersecurity Intern",
      org: "AICTE Cisco Virtual",
      type: "work",
      icon: Briefcase,
      color: "#f472b6",
      desc: "Cloud security architecture, AWS VPC/IAM configurations, network defense"
    },
    {
      year: "2023",
      month: "Oct",
      title: "E-Cell Creative Lead",
      org: "Udyam, GGITS",
      type: "leadership",
      icon: Star,
      color: "#fb923c",
      desc: "Graphic design & branding for entrepreneurship events and competitions"
    },
    {
      year: "2024",
      month: "Jul",
      title: "Cloud Security Intern",
      org: "AICTE Cisco Virtual",
      type: "work",
      icon: Briefcase,
      color: "#f472b6",
      desc: "Penetration testing methodologies, encryption protocols, network infrastructure"
    },
    {
      year: "2024",
      month: "Aug",
      title: "Full Stack Dev & Team Lead",
      org: "Ouranos Robotics",
      type: "work",
      icon: Rocket,
      color: "#818cf8",
      desc: "Led 5+ member team, built IoT console, 3D website, mobile app. Reduced API latency 40%"
    },
    {
      year: "2024",
      month: "Sep",
      title: "Intern of the Month",
      org: "Ouranos Robotics",
      type: "achievement",
      icon: Award,
      color: "#fb923c",
      desc: "Recognized for outstanding contribution to IoT dashboard development"
    },
    {
      year: "2024",
      month: "Oct",
      title: "Hacktoberfest 2024",
      org: "Open Source",
      type: "achievement",
      icon: Code,
      color: "#818cf8",
      desc: "4 accepted pull requests across JavaScript and Python repositories"
    },
    {
      year: "2024",
      month: "Oct",
      title: "RoomieQ India",
      org: "Freelance Project",
      type: "project",
      icon: Code,
      color: "#f472b6",
      desc: "MERN stack roommate platform with real-time chat, 40% latency reduction"
    },
    {
      year: "2025",
      month: "Jan",
      title: "TechSynergy IoT - 2nd Place",
      org: "Gyanotsav 2025, GGITS",
      type: "achievement",
      icon: Award,
      color: "#fb923c",
      desc: "Real-time IoT monitoring platform with sub-100ms telemetry and live dashboard"
    },
    {
      year: "2025",
      month: "Feb",
      title: "3x College Topper",
      org: "Code360 Leaderboard",
      type: "achievement",
      icon: Star,
      color: "#818cf8",
      desc: "Ranked #1 in college coding leaderboard across multiple semesters"
    },
    {
      year: "2025",
      month: "Sep",
      title: "Frappe Developer Intern",
      org: "Alfastack Solutions",
      type: "work",
      icon: Briefcase,
      color: "#f472b6",
      desc: "Supplier/Customer portals, AI defect detection (95% accuracy), ERP automation"
    },
    {
      year: "2025",
      month: "Oct",
      title: "5/5 Performance Rating",
      org: "Ouranos Robotics",
      type: "achievement",
      icon: Award,
      color: "#fb923c",
      desc: "Excellent rating for exceptional technical contributions during internship"
    },
    {
      year: "2025",
      month: "Dec",
      title: "TCS CodeVita - AIR 4905",
      org: "TCS CodeVita Season 13",
      type: "achievement",
      icon: Award,
      color: "#818cf8",
      desc: "All India Rank 4905 in Round 2 among 500,000+ participants"
    },
    {
      year: "2026",
      month: "Feb",
      title: "ClickMyze Agency Website",
      org: "Freelance",
      type: "project",
      icon: Code,
      color: "#f472b6",
      desc: "High-performance creative tech agency website with 8-step methodology showcase"
    },
    {
      year: "2026",
      month: "Mar",
      title: "IAENG Membership",
      org: "International Association of Engineers",
      type: "achievement",
      icon: Star,
      color: "#fb923c",
      desc: "Member of global engineering professional community"
    },
    {
      year: "2026",
      month: "Mar",
      title: "Fly with Zara",
      org: "Freelance - IATA Travel Agency",
      type: "project",
      icon: Rocket,
      color: "#818cf8",
      desc: "Complete digital transformation for IATA-certified travel agency"
    }
  ];

  useEffect(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll('.trajectory-item');
    gsap.fromTo(items,
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 85%', once: true }
      }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const typeColors = {
    work: { bg: "bg-[#f472b6]/10", border: "border-[#f472b6]/30", text: "text-[#f472b6]" },
    education: { bg: "bg-[#818cf8]/10", border: "border-[#818cf8]/30", text: "text-[#818cf8]" },
    achievement: { bg: "bg-[#fb923c]/10", border: "border-[#fb923c]/30", text: "text-[#fb923c]" },
    project: { bg: "bg-[#34d399]/10", border: "border-[#34d399]/30", text: "text-[#34d399]" },
    leadership: { bg: "bg-[#fbbf24]/10", border: "border-[#fbbf24]/30", text: "text-[#fbbf24]" }
  };

  return (
    <OSWindow title="CAREER_TRAJECTORY.SYS" icon={<TrendingUp size={16} className="text-[#818cf8]" />} width="max-w-7xl">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-[#818cf8]/20">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#818cf8]" />
            <span className="text-xs mono text-gray-400">Career Timeline — 2022 to Present</span>
          </div>
          <div className="flex gap-3 text-[10px] mono">
            <span className="text-[#f472b6] bg-[#f472b6]/10 px-2 py-0.5 rounded">Work</span>
            <span className="text-[#fb923c] bg-[#fb923c]/10 px-2 py-0.5 rounded">Awards</span>
            <span className="text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded">Projects</span>
            <span className="text-[#818cf8] bg-[#818cf8]/10 px-2 py-0.5 rounded">Education</span>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-6 border-l-2 border-[#818cf8]/20 space-y-4">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const tc = typeColors[m.type];
            return (
              <div key={i} className="trajectory-item group relative">
                {/* Dot on timeline */}
                <div
                  className="absolute -left-[31px] top-3 w-4 h-4 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center transition-transform group-hover:scale-125"
                  style={{ backgroundColor: m.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-gray-800/60 hover:border-[#818cf8]/30 bg-gradient-to-r from-[#030712] to-transparent hover:bg-[#818cf8]/5 transition-all duration-300">
                  {/* Date */}
                  <div className="flex items-center gap-2 sm:w-24 shrink-0">
                    <span className="text-sm font-bold mono" style={{ color: m.color }}>{m.month} {m.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Icon size={16} style={{ color: m.color }} />
                      <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                        {m.title}
                      </h4>
                      <span className={`text-[9px] mono px-2 py-0.5 rounded ${tc.bg} ${tc.border} ${tc.text} border uppercase`}>
                        {m.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#818cf8] mono mb-1">{m.org}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-[#818cf8]/20 flex flex-wrap justify-between items-center gap-3 text-[10px] mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Briefcase size={12} className="text-[#f472b6]" />
              <span className="text-gray-500">3+ Professional Roles</span>
            </span>
            <span className="flex items-center gap-1">
              <Award size={12} className="text-[#fb923c]" />
              <span className="text-gray-500">7+ Awards</span>
            </span>
            <span className="flex items-center gap-1">
              <Code size={12} className="text-[#34d399]" />
              <span className="text-gray-500">10+ Projects</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-600">ACTIVE</span>
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
