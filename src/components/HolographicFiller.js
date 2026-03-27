"use client";
import { useEffect, useRef } from 'react';

// Animated holographic 3D wireframe canvas filler for empty spaces next to cards
export default function HolographicFiller({ variant = 'cube' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);

    // 3D projection helper
    const project = (x, y, z, cx, cy, fov) => {
      const scale = fov / (fov + z);
      return { x: cx + x * scale, y: cy + y * scale, scale };
    };

    // Draw rotating wireframe cube
    const drawCube = (cx, cy, size, t) => {
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      const cosA = Math.cos(t * 0.5);
      const sinA = Math.sin(t * 0.5);
      const cosB = Math.cos(t * 0.3);
      const sinB = Math.sin(t * 0.3);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let rx = x * cosA + z * sinA;
        let rz = -x * sinA + z * cosA;
        // Rotate X
        let ry = y * cosB - rz * sinB;
        let rz2 = y * sinB + rz * cosB;
        return project(rx * size, ry * size, rz2 * size, cx, cy, 300);
      });

      // Draw edges
      edges.forEach(([a, b]) => {
        const pA = projected[a];
        const pB = projected[b];
        const avgScale = (pA.scale + pB.scale) / 2;
        const opacity = 0.15 + avgScale * 0.15;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
        ctx.lineWidth = avgScale * 1.2;
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${0.3 + p.scale * 0.3})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${0.05 * p.scale})`;
        ctx.fill();
      });
    };

    // Draw rotating wireframe torus
    const drawTorus = (cx, cy, R, r, t) => {
      const points = [];
      const cosA = Math.cos(t * 0.4);
      const sinA = Math.sin(t * 0.4);
      const cosB = Math.cos(t * 0.25);
      const sinB = Math.sin(t * 0.25);

      const uSteps = 16;
      const vSteps = 10;

      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * Math.PI * 2;
          let x = (R + r * Math.cos(v)) * Math.cos(u);
          let y = (R + r * Math.cos(v)) * Math.sin(u);
          let z = r * Math.sin(v);

          // Rotate
          let rx = x * cosA + z * sinA;
          let rz = -x * sinA + z * cosA;
          let ry = y * cosB - rz * sinB;
          let rz2 = y * sinB + rz * cosB;

          const p = project(rx, ry, rz2, cx, cy, 300);
          points.push({ ...p, i, j });
        }
      }

      // Draw grid lines
      for (let i = 0; i < uSteps; i++) {
        for (let j = 0; j < vSteps; j++) {
          const idx = i * (vSteps + 1) + j;
          const p1 = points[idx];
          const p2 = points[idx + 1];
          const p3 = points[idx + (vSteps + 1)];

          if (p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 114, 182, ${0.08 + p1.scale * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          if (p3) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.08 + p1.scale * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Draw orbiting particles around a shape
    const drawOrbitParticles = (cx, cy, radius, count, t) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * 0.3;
        const wobble = Math.sin(t * 0.8 + i * 2) * 8;
        const x = cx + Math.cos(angle) * (radius + wobble);
        const y = cy + Math.sin(angle) * (radius + wobble) * 0.6;
        const pulse = 0.3 + Math.sin(t * 1.2 + i) * 0.2;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${pulse})`;
        ctx.fill();

        // Trail
        for (let trail = 1; trail <= 3; trail++) {
          const trailAngle = angle - trail * 0.08;
          const tx = cx + Math.cos(trailAngle) * (radius + wobble);
          const ty = cy + Math.sin(trailAngle) * (radius + wobble) * 0.6;
          ctx.beginPath();
          ctx.arc(tx, ty, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 146, 60, ${pulse * (0.3 / trail)})`;
          ctx.fill();
        }
      }
    };

    // Draw floating DNA helix
    const drawDNA = (cx, cy, height, t) => {
      const steps = 30;
      const amplitude = 25;
      const halfH = height / 2;

      for (let strand = 0; strand < 2; strand++) {
        const offset = strand * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const progress = i / steps;
          const yPos = cy - halfH + progress * height;
          const xPos = cx + Math.sin(progress * Math.PI * 4 + t * 0.6 + offset) * amplitude;
          if (i === 0) ctx.moveTo(xPos, yPos);
          else ctx.lineTo(xPos, yPos);
        }
        const color = strand === 0 ? '129, 140, 248' : '244, 114, 182';
        ctx.strokeStyle = `rgba(${color}, 0.2)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Cross bridges
      for (let i = 0; i < steps; i += 3) {
        const progress = i / steps;
        const yPos = cy - halfH + progress * height;
        const x1 = cx + Math.sin(progress * Math.PI * 4 + t * 0.6) * amplitude;
        const x2 = cx + Math.sin(progress * Math.PI * 4 + t * 0.6 + Math.PI) * amplitude;
        const pulse = 0.1 + Math.sin(t + i * 0.5) * 0.08;

        ctx.beginPath();
        ctx.moveTo(x1, yPos);
        ctx.lineTo(x2, yPos);
        ctx.strokeStyle = `rgba(99, 220, 200, ${pulse})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Bridge dots
        const midX = (x1 + x2) / 2;
        ctx.beginPath();
        ctx.arc(midX, yPos, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 220, 200, ${pulse * 1.5})`;
        ctx.fill();
      }
    };

    // Draw atom/molecule model
    const drawAtom = (cx, cy, size, t) => {
      // Nucleus
      const nucleusPulse = 0.3 + Math.sin(t * 1.5) * 0.1;
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 146, 60, ${nucleusPulse})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 146, 60, ${nucleusPulse * 0.3})`;
      ctx.fill();

      // Electron orbits
      const orbits = [
        { rx: size * 0.7, ry: size * 0.25, rot: 0, speed: 1.2 },
        { rx: size * 0.6, ry: size * 0.5, rot: Math.PI / 3, speed: -0.8 },
        { rx: size * 0.8, ry: size * 0.3, rot: -Math.PI / 4, speed: 1.5 }
      ];

      orbits.forEach((orbit, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orbit.rot);

        // Orbit path
        ctx.beginPath();
        ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(129, 140, 248, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Electron
        const eAngle = t * orbit.speed + idx * 2;
        const ex = Math.cos(eAngle) * orbit.rx;
        const ey = Math.sin(eAngle) * orbit.ry;
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        const colors = ['129, 140, 248', '244, 114, 182', '99, 220, 200'];
        ctx.fillStyle = `rgba(${colors[idx]}, 0.5)`;
        ctx.fill();

        // Electron glow
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[idx]}, 0.1)`;
        ctx.fill();

        ctx.restore();
      });
    };

    // Draw constellation network
    const drawConstellation = (cx, cy, size, t) => {
      const nodeCount = 12;
      const nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const r = size * (0.4 + Math.sin(t * 0.3 + i * 1.7) * 0.15);
        const x = cx + Math.cos(angle + t * 0.1) * r;
        const y = cy + Math.sin(angle + t * 0.1) * r * 0.7;
        nodes.push({ x, y });
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < size * 0.7) {
            const opacity = 0.06 * (1 - dist / (size * 0.7));
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n, i) => {
        const pulse = 0.2 + Math.sin(t * 0.8 + i * 1.3) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(251, 146, 60, ${pulse})`
          : `rgba(129, 140, 248, ${pulse})`;
        ctx.fill();
      });

      // Pulsing ring
      const ringRadius = size * (0.5 + Math.sin(t * 0.5) * 0.05);
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(129, 140, 248, 0.04)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const variantMap = {
      cube: (w, h, t) => {
        const cx = w / 2;
        const cy = h / 2;
        const size = Math.min(w, h) * 0.25;
        drawCube(cx, cy, size, t);
        drawOrbitParticles(cx, cy, size * 1.8, 8, t);
      },
      torus: (w, h, t) => {
        const cx = w / 2;
        const cy = h / 2;
        const size = Math.min(w, h) * 0.2;
        drawTorus(cx, cy, size * 1.2, size * 0.4, t);
        drawOrbitParticles(cx, cy, size * 2, 6, t);
      },
      dna: (w, h, t) => {
        const cx = w / 2;
        const cy = h / 2;
        const height = Math.min(h * 0.7, 200);
        drawDNA(cx, cy, height, t);
        drawOrbitParticles(cx, cy, 40, 5, t);
      },
      atom: (w, h, t) => {
        const cx = w / 2;
        const cy = h / 2;
        const size = Math.min(w, h) * 0.3;
        drawAtom(cx, cy, size, t);
      },
      constellation: (w, h, t) => {
        const cx = w / 2;
        const cy = h / 2;
        const size = Math.min(w, h) * 0.35;
        drawConstellation(cx, cy, size, t);
      }
    };

    const animate = () => {
      time += 0.016;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const drawFn = variantMap[variant] || variantMap.cube;
      drawFn(w, h, time);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [variant]);

  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center relative" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Subtle label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] mono text-gray-700 tracking-widest uppercase select-none">
        {variant === 'cube' && 'HOLOGRAPHIC_RENDER'}
        {variant === 'torus' && 'QUANTUM_TOPOLOGY'}
        {variant === 'dna' && 'NEURAL_HELIX'}
        {variant === 'atom' && 'ATOMIC_MODEL'}
        {variant === 'constellation' && 'STAR_NETWORK'}
      </div>
    </div>
  );
}
