import OSWindow from "./OSWindow";
import { ShieldCheck } from "lucide-react";

export default function CertificationsNode() {
  const certGroups = [
    { title: "CISCO", certs: ["CCNA (ITN, SRWE, ENSA)", "Cybersecurity Essentials", "DevNet Associate", "Packet Tracer Proficiency"] },
    { title: "CLOUD", certs: ["AWS Cloud Practitioner (#65058)", "Alibaba Cloud Certified Developer"] },
    { title: "ORACLE, RED HAT & SYSTEMS", certs: ["Java Programming", "SQL Database", "Linux Fundamentals (RH104 - RHA)"] }
  ];

  return (
    <OSWindow title="SECURITY/CLEARANCES.CER" icon={<ShieldCheck size={16} className="text-[#00f0ff] animate-pulse" />}>
      <div className="flex flex-col gap-4">
        {certGroups.map((group, idx) => (
          <div key={idx} className="border-l-2 border-[#ff003c]/40 hover:border-[#ff003c] pl-3 py-1 bg-gradient-to-r from-[#ff003c]/5 to-transparent transition-all group">
            <h4 className="text-[#ff003c] mono text-xs font-bold mb-2 group-hover:drop-shadow-[0_0_5px_rgba(255,0,60,0.8)]">[{group.title}_CLEARANCE]</h4>
            <div className="flex flex-wrap gap-2">
              {group.certs.map((cert, i) => (
                <span key={i} className="text-gray-300 text-xs mono px-2 py-1 bg-[#030712]/80 border border-gray-700 rounded shadow-[0_0_5px_rgba(0,0,0,0.5)] group-hover:border-[#00f0ff]/40 group-hover:text-[#00f0ff] hover:!border-[#00f0ff] transition-all cursor-default">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OSWindow>
  );
}
