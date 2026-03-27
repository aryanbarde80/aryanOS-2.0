"use client";

export default function AmbientParticles() {
  const particles = [
    { left: '5%', color: 'rgba(129, 140, 248, 0.4)', duration: '18s', delay: '0s', size: 2 },
    { left: '15%', color: 'rgba(244, 114, 182, 0.35)', duration: '22s', delay: '3s', size: 3 },
    { left: '25%', color: 'rgba(52, 211, 153, 0.3)', duration: '16s', delay: '7s', size: 2 },
    { left: '35%', color: 'rgba(251, 146, 60, 0.3)', duration: '20s', delay: '2s', size: 2 },
    { left: '45%', color: 'rgba(129, 140, 248, 0.35)', duration: '24s', delay: '5s', size: 3 },
    { left: '55%', color: 'rgba(139, 92, 246, 0.3)', duration: '19s', delay: '8s', size: 2 },
    { left: '65%', color: 'rgba(244, 114, 182, 0.3)', duration: '21s', delay: '1s', size: 2 },
    { left: '75%', color: 'rgba(52, 211, 153, 0.35)', duration: '17s', delay: '6s', size: 3 },
    { left: '85%', color: 'rgba(129, 140, 248, 0.3)', duration: '23s', delay: '4s', size: 2 },
    { left: '95%', color: 'rgba(251, 146, 60, 0.35)', duration: '15s', delay: '9s', size: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="ambient-particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--duration': p.duration,
            '--delay': p.delay,
          }}
        />
      ))}
    </div>
  );
}
