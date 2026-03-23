export default function OSWindow({ title, children, width = "max-w-4xl", icon = "📁" }) {
  return (
    <div className={`glass-panel mx-auto w-full ${width} relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,240,255,0.15)] hover:border-[#00f0ff]/50 mb-4 sm:mb-6 overflow-hidden rounded-lg`}>
      {/* Top bar */}
      <div className="flex border-b border-[#00f0ff]/30 p-2 sm:p-3 px-3 sm:px-4 items-center justify-between bg-[#030712]/80 rounded-t-[7px]">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-[#00f0ff]/80 mono text-[10px] sm:text-sm tracking-wider uppercase font-semibold truncate max-w-[60%]">
          <span className="shrink-0">{icon}</span> <span className="truncate">{title}</span>
        </div>
        <div className="w-[40px] sm:w-[52px] shrink-0"></div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-5 md:p-8">
        {children}
      </div>
    </div>
  );
}
