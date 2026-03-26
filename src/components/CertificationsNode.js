import OSWindow from "./OSWindow";
import { ShieldCheck, Award, Cloud, Database, Code, Terminal, Shield, Brain } from "lucide-react";

export default function CertificationsNode() {
  const certGroups = [
    { 
      title: "CISCO", 
      icon: Shield,
      color: "#818cf8",
      certs: [
        "CCNA (ITN, SRWE, ENSA)", 
        "Cybersecurity Essentials", 
        "DevNet Associate", 
        "Packet Tracer Proficiency",
        "Python Programming",
        "C++ Programming"
      ] 
    },
    { 
      title: "CLOUD", 
      icon: Cloud,
      color: "#fb923c",
      certs: [
        "AWS Cloud Practitioner (#65058)", 
        "Alibaba Cloud Certified Developer",
        "Google Cloud Platform (GCP) Fundamentals"
      ] 
    },
    { 
      title: "ORACLE", 
      icon: Database,
      color: "#f472b6",
      certs: [
        "Java Programming (Oracle Certified Associate)", 
        "SQL Database", 
        "Database Design"
      ] 
    },
    { 
      title: "OPEN SOURCE & FREE CODE", 
      icon: Code,
      color: "#818cf8",
      certs: [
        "FreeCodeCamp – Responsive Web Design",
        "Red Hat Training – Linux Fundamentals (RH104 – RHA) Ver. 9.1",
        "Salesforce Developer Program (TCS iON Collaboration)",
        "Hacktoberfest 2024 Contributor"
      ] 
    },
    { 
      title: "ADDITIONAL TRAINING", 
      icon: Brain,
      color: "#fb923c",
      certs: [
        "AICTE Cisco Virtual Internship - Cybersecurity & Cloud Security",
        "AICTE Cisco Virtual Internship - Cloud Security Architecture",
        "Network Defense & Penetration Testing Methodologies"
      ] 
    }
  ];

  const totalCertifications = certGroups.reduce((acc, group) => acc + group.certs.length, 0);

  return (
    <OSWindow title="Certifications" icon={<ShieldCheck size={16} className="text-[#818cf8]" />}>
      <div className="space-y-5">
        
        {/* Header with Counter */}
        <div className="flex justify-between items-center pb-2 border-b border-[#818cf8]/20">
          <div className="flex items-center gap-2">
            <Award size={14} className="text-[#fb923c]" />
            <span className="text-[10px] mono text-gray-500">Verified Credentials</span>
          </div>
          <div className="text-[10px] mono text-[#818cf8] bg-[#818cf8]/10 px-2 py-0.5 rounded">
            {totalCertifications} Credentials
          </div>
        </div>

        {/* Certification Groups */}
        <div className="space-y-5">
          {certGroups.map((group, idx) => {
            const IconComponent = group.icon;
            return (
              <div 
                key={idx} 
                className="group relative transition-all duration-300"
              >
                {/* Group Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 rounded bg-[#030712] border border-gray-800 group-hover:border-[#818cf8]/40 transition-all">
                    <IconComponent size={12} style={{ color: group.color }} />
                  </div>
                  <h4 
                    className="text-[11px] sm:text-[12px] mono font-bold tracking-wide"
                    style={{ color: group.color }}
                  >
                    {group.title}
                  </h4>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#818cf8]/20 to-transparent"></div>
                  <span className="text-[8px] text-gray-600">{group.certs.length} items</span>
                </div>
                
                {/* Certifications Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 sm:pl-3 border-l-2 border-[#818cf8]/20 hover:border-[#f472b6]/40 transition-all">
                  {group.certs.map((cert, i) => (
                    <div 
                      key={i} 
                      className="group/cert flex items-start gap-2 p-2 rounded hover:bg-[#818cf8]/5 transition-all duration-200 cursor-default"
                    >
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }}></div>
                      <span className="text-[10px] sm:text-[11px] text-gray-300 leading-relaxed hover:text-white transition-colors">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="mt-4 pt-3 border-t border-[#818cf8]/20 flex flex-wrap justify-between items-center gap-3 text-[8px] sm:text-[9px] mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Terminal size={10} className="text-[#818cf8]" />
              <span className="text-gray-500">Updated: 2026</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={10} className="text-[#f472b6]" />
              <span className="text-gray-500">All Active</span>
            </span>
          </div>
          <div className="text-gray-600">
            {totalCertifications}+ verified credentials
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
