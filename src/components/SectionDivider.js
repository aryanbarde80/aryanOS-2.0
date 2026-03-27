"use client";
import { useEffect, useRef, useState } from 'react';

export default function SectionDivider({ variant = 'circuit' }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const selectedVariant = useRef(variant);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Circuit board pattern
    const drawCircuit = () => {
      const segments = 12;
      const segW = w() / segments;
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < segments; i++) {
        const x = i * segW;
        const yMid = h() / 2;
        const waveY = Math.sin(time * 2 + i * 0.8) * 8;
        const nextWaveY = Math.sin(time * 2 + (i + 1) * 0.8) * 8;

        ctx.beginPath();
        ctx.moveTo(x, yMid + waveY);

        // Random path segments
        if (i % 3 === 0) {
          ctx.lineTo(x + segW * 0.3, yMid + waveY);
          ctx.lineTo(x + segW * 0.3, yMid + waveY - 10);
          ctx.lineTo(x + segW * 0.7, yMid + nextWaveY - 10);
          ctx.lineTo(x + segW * 0.7, yMid + nextWaveY);
          ctx.lineTo(x + segW, yMid + nextWaveY);
        } else if (i % 3 === 1) {
          ctx.lineTo(x + segW * 0.4, yMid + waveY);
          ctx.lineTo(x + segW * 0.4, yMid + waveY + 8);
          ctx.lineTo(x + segW * 0.6, yMid + nextWaveY + 8);
          ctx.lineTo(x + segW * 0.6, yMid + nextWaveY);
          ctx.lineTo(x + segW, yMid + nextWaveY);
        } else {
          ctx.lineTo(x + segW, yMid + nextWaveY);
        }
        ctx.stroke();

        // Junction nodes
        if (i % 2 === 0) {
          const nodeX = x + segW * 0.5;
          const nodeY = yMid + (waveY + nextWaveY) / 2;
          const nodeGlow = 0.3 + Math.sin(time * 3 + i) * 0.2;

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(129, 140, 248, ${nodeGlow})`;
          ctx.fill();

          // Node glow
          const gradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 12);
          gradient.addColorStop(0, `rgba(129, 140, 248, ${nodeGlow * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(nodeX - 12, nodeY - 12, 24, 24);
        }
      }

      // Traveling pulse along the circuit
      const pulsePos = ((time * 80) % w());
      const pulseY = h() / 2 + Math.sin(time * 2 + pulsePos / segW * 0.8) * 8;
      const pulseGrad = ctx.createRadialGradient(pulsePos, pulseY, 0, pulsePos, pulseY, 20);
      pulseGrad.addColorStop(0, 'rgba(165, 180, 252, 0.6)');
      pulseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = pulseGrad;
      ctx.fillRect(pulsePos - 20, pulseY - 20, 40, 40);
    };

    // Data stream animation
    const drawDataStream = () => {
      const chars = '01';
      const columns = 30;
      const colW = w() / columns;
      ctx.font = '10px JetBrains Mono, monospace';

      for (let i = 0; i < columns; i++) {
        const x = i * colW + colW / 2;
        const speed = 1 + (i % 4) * 0.5;
        const offset = (time * speed * 30 + i * 17) % h();
        const char = chars[Math.floor(time * 5 + i) % chars.length];
        const fade = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5;

        ctx.fillStyle = `rgba(52, 211, 153, ${0.15 * fade})`;
        ctx.fillText(char, x, offset);

        // Trailing glow
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(52, 211, 153, ${0.08 * fade})`;
          ctx.fillText(chars[(Math.floor(time * 3 + i) + 1) % chars.length], x, (offset + 14) % h());
        }
      }

      // Horizontal scan line
      const scanY = (Math.sin(time * 1.5) * 0.5 + 0.5) * h();
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
      scanGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.15)');
      scanGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 2, w(), 4);
    };

    // Pulse wave
    const drawPulse = () => {
      const centerY = h() / 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let x = 0; x < w(); x += 2) {
        const progress = x / w();
        const wave1 = Math.sin(x * 0.02 + time * 3) * 12;
        const wave2 = Math.sin(x * 0.05 + time * 2) * 6;
        const wave3 = Math.cos(x * 0.01 + time * 1.5) * 4;
        const envelope = Math.sin(progress * Math.PI) * 0.8 + 0.2;
        const y = centerY + (wave1 + wave2 + wave3) * envelope;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(244, 114, 182, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second wave offset
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let x = 0; x < w(); x += 2) {
        const progress = x / w();
        const wave1 = Math.sin(x * 0.02 + time * 3 + 1) * 10;
        const wave2 = Math.cos(x * 0.04 + time * 2.5) * 5;
        const envelope = Math.sin(progress * Math.PI) * 0.8 + 0.2;
        const y = centerY + (wave1 + wave2) * envelope;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pulse dots at peaks
      for (let x = 0; x < w(); x += 60) {
        const wave = Math.sin(x * 0.02 + time * 3) * 12;
        const progress = x / w();
        const envelope = Math.sin(progress * Math.PI) * 0.8 + 0.2;
        const y = centerY + wave * envelope;
        const glow = 0.2 + Math.sin(time * 4 + x * 0.01) * 0.15;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${glow})`;
        ctx.fill();
      }
    };

    // Audio waveform style
    const drawWaveform = () => {
      const bars = 40;
      const barW = w() / bars - 2;
      const centerY = h() / 2;

      for (let i = 0; i < bars; i++) {
        const x = i * (barW + 2) + 1;
        const amplitude = Math.sin(time * 2 + i * 0.3) * 0.5 + 0.5;
        const height = 4 + amplitude * (h() * 0.6);
        const glow = 0.1 + amplitude * 0.2;

        const gradient = ctx.createLinearGradient(x, centerY - height / 2, x, centerY + height / 2);
        gradient.addColorStop(0, `rgba(129, 140, 248, ${glow * 0.3})`);
        gradient.addColorStop(0.5, `rgba(129, 140, 248, ${glow})`);
        gradient.addColorStop(1, `rgba(244, 114, 182, ${glow * 0.3})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - height / 2, barW, height);
      }
    };

    // Matrix rain style
    const drawMatrix = () => {
      const columns = 20;
      const colW = w() / columns;
      const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
      ctx.font = '11px JetBrains Mono, monospace';

      for (let i = 0; i < columns; i++) {
        const x = i * colW + colW / 2;
        const drops = 3;
        for (let d = 0; d < drops; d++) {
          const speed = 1.5 + d * 0.5;
          const yBase = ((time * speed * 25 + i * 13 + d * 31) % (h() + 20)) - 10;
          const char = glyphs[Math.floor(time * 8 + i + d) % glyphs.length];
          const brightness = d === 0 ? 0.3 : 0.12;
          const fade = 1 - (yBase / h()) * 0.5;

          ctx.fillStyle = `rgba(52, 211, 153, ${brightness * fade})`;
          ctx.fillText(char, x, yBase);
        }
      }

      // Horizontal glow line
      const lineY = h() / 2;
      const lineGrad = ctx.createLinearGradient(0, 0, w(), 0);
      lineGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
      lineGrad.addColorStop(0.3, 'rgba(52, 211, 153, 0.08)');
      lineGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.15)');
      lineGrad.addColorStop(0.7, 'rgba(52, 211, 153, 0.08)');
      lineGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, lineY - 0.5, w(), 1);
    };

    const drawFunctions = {
      circuit: drawCircuit,
      dataStream: drawDataStream,
      pulse: drawPulse,
      waveform: drawWaveform,
      matrix: drawMatrix,
    };

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawFn = drawFunctions[selectedVariant.current];
      if (drawFn) drawFn();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div className="section-divider-wrapper" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '40px', opacity: 0.8 }}
      />
    </div>
  );
}
