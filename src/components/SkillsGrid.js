import OSWindow from "./OSWindow";
import { Cpu } from "lucide-react";

export default function SkillsGrid() {
  const skillsConfig = [
    {
      category: "sys.languages",
      items: ["Python", "JavaScript", "C/C++", "Java", "SQL", "Bash/Shell", "HTML/CSS"]
    },
    {
      category: "sys.frontend",
      items: ["React.js", "Next.js", "React Native", "Three.js", "Tailwind CSS", "Zustand"]
    },
    {
      category: "sys.backend",
      items: ["Node.js", "Express", "FastAPI", "Frappe Framework", "Socket.io", "Flask"]
    },
    {
      category: "sys.cloud_db",
      items: ["AWS", "GCP", "Docker", "PostgreSQL", "MongoDB", "Redis", "Firebase", "CI/CD"]
    },
    {
      category: "sys.iot_tools",
      items: ["ESP32", "MQTT Protocol", "IoT Architecture", "Figma", "Git/Linux"]
    }
  ];

  return (
    <OSWindow title="MODULES/SKILLS.DAT" icon={<Cpu size={16} className="text-[#00f0ff] animate-pulse" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsConfig.map((group, idx) => (
          <div key={idx} className="border border-[#00f0ff]/20 bg-[#030712]/40 p-4 rounded relative overflow-hidden group hover:border-[#00f0ff]/60 transition-colors">
            {/* Folder tab look */}
            <div className="text-sm font-black text-[#00f0ff] mono mb-4 opacity-100 tracking-[0.2em] uppercase border-b border-[#00f0ff]/10 pb-2">
              {'>'} {group.category}
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 relative z-10">
              {group.items.map((skill, i) => (
                <div 
                  key={i} 
                  className="group/skill relative px-4 py-2 bg-[#030712]/80 border border-[#00f0ff]/20 hover:border-[#00f0ff] overflow-hidden transition-all duration-300 cursor-crosshair shadow-[0_0_0px_rgba(0,240,255,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] rounded-sm"
                >
                  <div className="absolute inset-0 w-full h-[300%] bg-gradient-to-b from-transparent via-[#00f0ff]/20 to-transparent -translate-y-full group-hover/skill:animate-[scanner_2s_ease-in-out_infinite]"></div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#00f0ff] w-0 group-hover/skill:w-full transition-all duration-500 ease-out z-0"></div>
                  <span className="text-gray-300 group-hover/skill:text-white text-sm mono relative z-10 transition-colors group-hover/skill:text-shadow-[0_0_5px_rgba(0,240,255,0.8)]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OSWindow>
  );
}
