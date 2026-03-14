
import React, { useEffect, useRef } from 'react';

const TetEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const items: any[] = [];
    const maxItems = 30; // Số lượng vật thể

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spin: number;
      type: 'FLOWER' | 'ENVELOPE';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        // Giảm kích thước: từ (10-25) xuống (8-18)
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
        this.type = Math.random() > 0.8 ? 'ENVELOPE' : 'FLOWER'; // 20% là lì xì
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.angle += this.spin;

        if (this.y > height) {
          this.y = -50;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);

        if (this.type === 'FLOWER') {
          // Vẽ hoa mai 5 cánh
          ctx.fillStyle = '#FFD700'; // Vàng
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(0, -this.size / 2, this.size / 3, this.size / 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.rotate((Math.PI * 2) / 5);
          }
          // Nhụy hoa
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FF4500';
          ctx.fill();
        } else {
          // Vẽ bao lì xì
          ctx.fillStyle = '#E60012'; // Đỏ
          ctx.fillRect(-this.size / 2, -this.size / 1.5, this.size, this.size * 1.4);
          // Họa tiết vàng
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
        }

        ctx.restore();
      }
    }

    const init = () => {
      for (let i = 0; i < maxItems; i++) {
        items.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      items.forEach((item) => {
        item.update();
        item.draw();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
    />
  );
};

export default TetEffects;
