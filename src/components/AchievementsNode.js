import OSWindow from "./OSWindow";
import { Award } from "lucide-react";

export default function AchievementsNode() {
  const achievements = [
    { name: "TCS CodeVita Season 13", rank: "AIR 4905 in Round 2", date: "Dec 2025" },
    { name: "Code360 Leaderboard", rank: "3-Time College Topper", date: "Feb 2025" },
    { name: "TechSynergy IoT, GGITS", rank: "Second Place", date: "Jan 2025" },
    { name: "Hacktoberfest 2024", rank: "4 Accepted PRs", date: "Oct 2024" },
    { name: "Ouranos Robotics", rank: "Intern of the Month", date: "Sep 2024" }
  ];

  return (
    <OSWindow title="SYS_AWARDS.LOG" icon={<Award size={16} className="text-[#00f0ff] animate-pulse" />}>
      <div className="w-full relative">
        <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00f0ff] to-transparent opacity-30"></div>
        <ul className="space-y-4">
          {achievements.map((item, idx) => (
            <li key={idx} className="relative pl-6 group">
              <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)] group-hover:scale-150 transition-transform"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#00f0ff]/10 pb-2 group-hover:border-[#00f0ff]/40 transition-colors">
                <div>
                  <h4 className="text-gray-200 font-bold text-sm tracking-wide group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">{item.name}</h4>
                  <p className="text-[#ff003c] mono text-xs mt-0.5 group-hover:drop-shadow-[0_0_5px_rgba(255,0,60,0.4)]">{item.rank}</p>
                </div>
                <span className="text-[10px] mono text-gray-500 mt-1 sm:mt-0 group-hover:text-[#00f0ff] transition-colors">{item.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </OSWindow>
  );
}
