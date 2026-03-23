import OSWindow from "./OSWindow";
import { GraduationCap } from "lucide-react";

export default function EducationNode() {
  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      inst: "Gyan Ganga Institute of Technology and Sciences",
      score: "CGPA: 8.14/10.0",
      year: "Nov 2022 - Present",
      status: "ACTIVE"
    },
    {
      degree: "Higher Secondary Education (PCM)",
      inst: "Board of Secondary Education, MP",
      score: "Percentage: 91%",
      year: "Apr 2020 - Feb 2021",
      status: "COMPLETED"
    },
    {
      degree: "Secondary Education",
      inst: "Board of Secondary Education, MP",
      score: "Percentage: 88%",
      year: "Apr 2018 - Feb 2019",
      status: "COMPLETED"
    }
  ];

  return (
    <OSWindow title="MEM_BANKS/EDUCATION.DAT" icon={<GraduationCap size={16} className="text-[#00f0ff] animate-pulse" />}>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={i} className="p-3 border border-[#00f0ff]/20 bg-[#030712]/40 rounded hover:border-[#00f0ff]/60 group transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-100 font-bold text-sm tracking-wide group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">{edu.degree}</h3>
              <span className={`text-[10px] mono px-1.5 py-0.5 rounded-sm ${edu.status === 'ACTIVE' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-gray-800 text-gray-400'}`}>
                {edu.status}
              </span>
            </div>
            <p className="text-[#ff003c] mono text-xs uppercase mb-2">{edu.inst}</p>
            <div className="flex justify-between text-xs text-gray-400 mono opacity-80 group-hover:opacity-100">
              <span className="text-[#00f0ff]">{edu.score}</span>
              <span>{edu.year}</span>
            </div>
          </div>
        ))}
      </div>
    </OSWindow>
  );
}
