
import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%#&_()@!<>[]';
    const fontSize = 15;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00F0FF';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Giới hạn FPS xuống 30 để tiết kiệm hiệu năng
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      // BẢO VỆ HIỆU NĂNG: Dừng vẽ Canvas khi người dùng chuyển Tab khác (Tiết kiệm Pin/CPU)
      if (document.hidden) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
          lastTime = currentTime - (deltaTime % interval);
          draw();
      }
    };

    animate(0);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * height / fontSize;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10"
      style={{ zIndex: 0 }}
    />
  );
};

export default MatrixBackground;
