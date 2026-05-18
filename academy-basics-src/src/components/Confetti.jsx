/**
 * Confetti.jsx — Lightweight canvas-based confetti burst.
 * Mounts, plays, then self-removes when the animation finishes.
 *
 * Props:
 *   count    (number)  – particle count, default 100
 *   duration (number)  – total ms before fade-out completes, default 4500
 */
import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#7c3aed', '#a78bfa', '#6d28d9',   // purples (brand)
  '#00e5ff', '#38bdf8',               // cyans
  '#fbbf24', '#f59e0b',               // golds
  '#22c55e',                          // green
  '#f472b6',                          // pink
  '#ffffff', '#e0e7ff',               // whites
];

function rand(min, max) { return Math.random() * (max - min) + min; }

function makeParticle(canvasW, canvasH) {
  return {
    x:        rand(0, canvasW),
    y:        rand(-canvasH * 0.6, -8),    // start above viewport
    vx:       rand(-3, 3),
    vy:       rand(2.5, 6),
    w:        rand(5, 11),
    h:        rand(3, 6),
    rot:      rand(0, Math.PI * 2),
    rotV:     rand(-0.15, 0.15),
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity:  1,
    wobble:   rand(0, Math.PI * 2),
    wobbleV:  rand(0.05, 0.12),
  };
}

export default function Confetti({ count = 100, duration = 4500 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const W      = canvas.width  = window.innerWidth;
    const H      = canvas.height = window.innerHeight;

    const FADE_START = 0.55; // fraction of duration at which to start fading

    const particles = Array.from({ length: count }, () => makeParticle(W, H));
    let rafId;
    let start = null;

    function frame(ts) {
      if (!start) start = ts;
      const elapsed  = ts - start;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Physics
        p.wobble += p.wobbleV;
        p.x  += p.vx + Math.sin(p.wobble) * 1.2;
        p.y  += p.vy;
        p.vy += 0.06;       // mild gravity
        p.rot += p.rotV;

        // Fade out in the last (1 - FADE_START) fraction
        const fadeProgress = Math.max(0, (progress - FADE_START) / (1 - FADE_START));
        p.opacity = 1 - fadeProgress;

        // Respawn if off bottom and still in early phase
        if (p.y > H + 20 && progress < FADE_START) {
          p.x  = rand(0, W);
          p.y  = rand(-80, -10);
          p.vx = rand(-3, 3);
          p.vy = rand(2.5, 5);
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        // Draw as rounded rectangle for nicer look
        const r = Math.min(p.w, p.h) * 0.3;
        ctx.beginPath();
        ctx.moveTo(-p.w / 2 + r, -p.h / 2);
        ctx.lineTo( p.w / 2 - r, -p.h / 2);
        ctx.quadraticCurveTo( p.w / 2, -p.h / 2,  p.w / 2, -p.h / 2 + r);
        ctx.lineTo( p.w / 2,  p.h / 2 - r);
        ctx.quadraticCurveTo( p.w / 2,  p.h / 2,  p.w / 2 - r,  p.h / 2);
        ctx.lineTo(-p.w / 2 + r,  p.h / 2);
        ctx.quadraticCurveTo(-p.w / 2,  p.h / 2, -p.w / 2,  p.h / 2 - r);
        ctx.lineTo(-p.w / 2, -p.h / 2 + r);
        ctx.quadraticCurveTo(-p.w / 2, -p.h / 2, -p.w / 2 + r, -p.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [count, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        9999,
      }}
    />
  );
}
