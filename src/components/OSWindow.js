export default function OSWindow({ title, children, width = "max-w-4xl", icon = "📁" }) {
  return (
    <div className={`glass-panel mx-auto w-full ${width} relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,240,255,0.15)] hover:border-[#00f0ff]/50 mb-12 overflow-hidden rounded-lg`}>
      {/* Top bar */}
      <div className="flex border-b border-[#00f0ff]/30 p-3 px-4 items-center justify-between bg-[#030712]/80 rounded-t-[7px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-2 text-[#00f0ff]/80 mono text-sm tracking-wider uppercase font-semibold">
          <span>{icon}</span> {title}
        </div>
        <div className="w-[52px]"></div> {/* Spacer */}
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
