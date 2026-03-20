import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { Play, RotateCcw, ShieldAlert, Crosshair, X, Heart } from 'lucide-react';

interface DeepfakeRunnerProps {
  lang: Language;
  onClose: () => void;
}

const DeepfakeRunner: React.FC<DeepfakeRunnerProps> = ({ lang, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [highScore, setHighScore] = useState(0);

  const gameRef = useRef({
    frames: 0,
    score: 0,
    health: 3,
    isGameOver: false,
    playerX: 0,
  });

  const startMatch = () => {
    setGameState('PLAYING');
    setScore(0);
    setHealth(3);
    gameRef.current = {
      frames: 0,
      score: 0,
      health: 3,
      isGameOver: false,
      playerX: canvasRef.current ? canvasRef.current.width / 2 : 150,
    };
  };

  useEffect(() => {
    const savedScore = localStorage.getItem('deepfense_shooter_hs');
    if (savedScore) setHighScore(parseInt(savedScore));
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth - 32;
      canvas.height = 350;
      gameRef.current.playerX = canvas.width / 2;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let bullets: { x: number, y: number, speed: number }[] = [];
    let enemies: { x: number, y: number, size: number, speed: number, hp: number, emoji: string, type: number, wobbleOffset: number }[] = [];
    let particles: { x: number, y: number, vx: number, vy: number, life: number, color: string }[] = [];

    const emojis = ['🎭', '🎙️', '🤖'];

    // --- CONTROLS ---
    const handleMove = (clientX: number) => {
        const rect = canvas.getBoundingClientRect();
        let x = clientX - rect.left;
        if (x < 20) x = 20;
        if (x > canvas.width - 20) x = canvas.width - 20;
        gameRef.current.playerX = x;
    };
    
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });

    const createExplosion = (x: number, y: number) => {
        const colors = ['#00F0FF', '#FF2A6D', '#FFD700', '#ffffff'];
        for (let i = 0; i < 20; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    };

    let animationId: number;

    const loop = () => {
      if (gameRef.current.isGameOver) return;
      gameRef.current.frames++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. DRAW SYNTHWAVE BACKGROUND
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#1a0b2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height, 120, Math.PI, 0);
      const sunGrad = ctx.createLinearGradient(0, canvas.height - 120, 0, canvas.height);
      sunGrad.addColorStop(0, 'rgba(255, 42, 109, 0.9)');
      sunGrad.addColorStop(0.5, 'rgba(255, 100, 0, 0.6)');
      sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Moving Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      const offset = (gameRef.current.frames * 2) % 30;
      for(let i = 0; i < canvas.height; i += 30) {
          ctx.beginPath();
          ctx.moveTo(0, i + offset);
          ctx.lineTo(canvas.width, i + offset);
          ctx.stroke();
      }
      for(let i = 0; i < canvas.width; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
      }

      // 2. PLAYER & SHOOTING
      const px = gameRef.current.playerX;
      const py = canvas.height - 30;
      
      // Auto shoot
      if (gameRef.current.frames % 12 === 0) {
          bullets.push({ x: px - 10, y: py, speed: 12 });
          bullets.push({ x: px + 10, y: py, speed: 12 });
      }

      // Draw Player Ship (Tech Shield)
      ctx.fillStyle = '#00F0FF';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(px, py - 20);
      ctx.lineTo(px + 20, py + 10);
      ctx.lineTo(px - 20, py + 10);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      // 3. BULLETS
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 10;
      for (let i = bullets.length - 1; i >= 0; i--) {
          let b = bullets[i];
          b.y -= b.speed;
          ctx.fillRect(b.x - 2, b.y, 4, 15);
          if (b.y < 0) bullets.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // 4. ENEMIES
      const diffMultiplier = 1 + Math.floor(gameRef.current.frames / 600) * 0.2;
      if (gameRef.current.frames % Math.max(30, Math.floor(80 / diffMultiplier)) === 0) {
          const type = Math.random();
          let hp = 1, speed = 2 * diffMultiplier, emoji = emojis[0];
          if (type > 0.8) { hp = 3; speed = 1 * diffMultiplier; emoji = '🤖'; } // Tank
          else if (type > 0.5) { speed = 4 * diffMultiplier; emoji = '🎙️'; } // Fast

          enemies.push({
              x: Math.random() * (canvas.width - 40) + 20,
              y: -30,
              size: 25,
              speed, hp, emoji, type, wobbleOffset: Math.random() * Math.PI * 2
          });
      }

      ctx.font = '28px Arial';
      ctx.textAlign = 'center';
      for (let i = enemies.length - 1; i >= 0; i--) {
          let e = enemies[i];
          e.y += e.speed;
          
          // Wobble effect for normal enemies
          let renderX = e.x;
          if (e.hp === 1 && e.speed < 3) {
              renderX += Math.sin(gameRef.current.frames * 0.05 + e.wobbleOffset) * 2;
          }

          ctx.fillText(e.emoji, renderX, e.y);
          
          // HP Bar for tanks
          if (e.hp > 1) {
              ctx.fillStyle = 'red';
              ctx.fillRect(renderX - 10, e.y - 35, 20, 4);
              ctx.fillStyle = '#05FF00';
              ctx.fillRect(renderX - 10, e.y - 35, 20 * (e.hp / 3), 4);
          }

          // Collision with Bullets
          let hit = false;
          for (let j = bullets.length - 1; j >= 0; j--) {
              let b = bullets[j];
              if (Math.abs(b.x - renderX) < 20 && Math.abs(b.y - e.y) < 20) {
                  bullets.splice(j, 1);
                  e.hp--;
                  hit = true;
                  break;
              }
          }

          if (e.hp <= 0) {
              createExplosion(renderX, e.y);
              gameRef.current.score += (e.type > 0.8 ? 50 : 10);
              setScore(gameRef.current.score);
              enemies.splice(i, 1);
              continue;
          }

          // Collision with Player or Bottom
          if (e.y > canvas.height + 20 || (Math.abs(renderX - px) < 30 && Math.abs(e.y - py) < 30)) {
              createExplosion(renderX, e.y);
              enemies.splice(i, 1);
              gameRef.current.health--;
              setHealth(gameRef.current.health);
              
              // Screen red flash effect
              ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              if (gameRef.current.health <= 0) {
                  gameRef.current.isGameOver = true;
                  setGameState('GAMEOVER');
                  if (gameRef.current.score > highScore) {
                      setHighScore(gameRef.current.score);
                      localStorage.setItem('deepfense_shooter_hs', gameRef.current.score.toString());
                  }
              }
          }
      }

      // 5. PARTICLES
      for (let i = particles.length - 1; i >= 0; i--) {
          let p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.03;
          if (p.life <= 0) {
              particles.splice(i, 1);
          } else {
              ctx.globalAlpha = p.life;
              ctx.fillStyle = p.color;
              ctx.fillRect(p.x, p.y, 4, 4);
              ctx.globalAlpha = 1.0;
          }
      }

      if (!gameRef.current.isGameOver) {
        animationId = requestAnimationFrame(loop);
      }
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [gameState]);

  return (
    <div className="bg-surface border-2 border-white/10 rounded-3xl p-4 md:p-6 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden mb-16 animate-in slide-in-from-bottom-8 duration-500">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-20">
          <X size={16} />
      </button>

      <div className="flex justify-between items-center mb-4 font-mono text-sm relative z-10 px-2">
         <div className="flex items-center gap-2 font-black text-primary uppercase tracking-widest"><Crosshair size={18}/> {lang === 'vi' ? 'NEURAL DEFENDER' : 'NEURAL DEFENDER'}</div>
         <div className="flex items-center gap-6">
             <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => (
                     <Heart key={i} size={16} className={i < health ? "fill-secondary text-secondary" : "text-gray-700"} />
                 ))}
             </div>
             <div className="text-gray-500 font-bold hidden sm:block">HI-SCORE: <span className="text-white">{highScore}</span></div>
             <div className="text-primary font-bold">SCORE: <span className="text-2xl text-white">{score}</span></div>
         </div>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black cursor-crosshair shadow-inner">
         <canvas ref={canvasRef} className="w-full block touch-none" />
         
         {gameState === 'START' && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4">
              <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">🚀</div>
              <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-widest mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                {lang === 'vi' ? 'TIÊU DIỆT VIRUS DEEPFAKE' : 'DESTROY DEEPFAKE VIRUS'}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-8 text-center max-w-md">
                {lang === 'vi' ? 'Vuốt hoặc di chuyển chuột để điều khiển Tường Lửa bảo vệ dữ liệu. Đừng để chúng lọt qua!' : 'Swipe or move mouse to control Firewall. Do not let them pass!'}
              </p>
              <button onClick={startMatch} className="bg-primary text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                <Play size={18}/> {lang === 'vi' ? 'KHỞI ĐỘNG HỆ THỐNG' : 'SYSTEM START'}
              </button>
           </div>
         )}

         {gameState === 'GAMEOVER' && (
           <div className="absolute inset-0 bg-red-900/80 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300">
              <ShieldAlert size={64} className="text-white mb-4 animate-bounce drop-shadow-xl" />
              <h3 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tighter mb-2">
                {lang === 'vi' ? 'HỆ THỐNG BỊ XUYÊN THỦNG!' : 'SYSTEM BREACHED!'}
              </h3>
              <p className="text-red-200 text-sm mb-8 px-4 text-center">
                {lang === 'vi' ? `Bạn đã ghi được ${score} điểm. Tội phạm mạng sẽ không bao giờ dừng lại!` : `You scored ${score} points. Cybercriminals never stop!`}
              </p>
              <button onClick={startMatch} className="bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-colors flex items-center gap-2 shadow-2xl">
                <RotateCcw size={16}/> {lang === 'vi' ? 'PHỤC HỒI HỆ THỐNG' : 'RESTORE SYSTEM'}
              </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default DeepfakeRunner;
import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { Play, RotateCcw, ShieldAlert, Gamepad2, X } from 'lucide-react';

interface DeepfakeRunnerProps {
  lang: Language;
  onClose: () => void;
}

const DeepfakeRunner: React.FC<DeepfakeRunnerProps> = ({ lang, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameRef = useRef({
    frames: 0,
    speed: 6,
    score: 0,
    isGameOver: false,
  });

  const startMatch = () => {
    setGameState('PLAYING');
    setScore(0);
    gameRef.current = {
      frames: 0,
      speed: 6,
      score: 0,
      isGameOver: false,
    };
  };

  useEffect(() => {
    const savedScore = localStorage.getItem('deepfense_highscore');
    if (savedScore) setHighScore(parseInt(savedScore));
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth - 32;
      canvas.height = 300; // Giảm chiều cao một chút để vừa vặn với trang chủ
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const groundY = canvas.height - 40;
    const player = {
      x: 50,
      y: groundY - 40,
      size: 40,
      dy: 0,
      jumpPower: -13,
      gravity: 0.8,
      grounded: true,
    };

    let obstacles: { x: number; y: number; size: number; emoji: string; passed: boolean }[] = [];
    const obstacleTypes = ['🎭', '🎙️', '🔗']; 

    let palms = [
      { x: canvas.width * 0.5, size: 60 },
      { x: canvas.width * 1.2, size: 80 }
    ];

    const jump = () => {
      if (player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('mousedown', jump);

    let animationId: number;

    const loop = () => {
      if (gameRef.current.isGameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gameRef.current.frames++;
      if (gameRef.current.frames % 500 === 0) gameRef.current.speed += 0.5;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#2a0a18');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 100, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 42, 109, 0.2)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 60, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 100, 0, 0.8)';
      ctx.fill();

      ctx.font = '60px Arial';
      palms.forEach(palm => {
        palm.x -= gameRef.current.speed * 0.2;
        if (palm.x + palm.size < 0) palm.x = canvas.width + Math.random() * 200;
        ctx.fillText('🌴', palm.x, groundY - 10);
      });

      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(0, groundY, canvas.width, 2);
      for(let i = 0; i < canvas.width; i+=40) {
         const offset = (gameRef.current.frames * gameRef.current.speed) % 40;
         ctx.fillRect(i - offset, groundY, 2, canvas.height - groundY);
      }

      player.dy += player.gravity;
      player.y += player.dy;
      if (player.y >= groundY - player.size) {
        player.y = groundY - player.size;
        player.dy = 0;
        player.grounded = true;
      }

      ctx.font = `${player.size}px Arial`;
      ctx.fillText('🛡️', player.x, player.y + player.size - 5);

      const spawnRate = Math.max(60, 120 - Math.floor(gameRef.current.frames / 20));
      if (gameRef.current.frames % spawnRate === 0) {
        obstacles.push({
          x: canvas.width,
          y: groundY - 35,
          size: 35,
          emoji: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
          passed: false
        });
      }

      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameRef.current.speed;
        ctx.font = `${obs.size}px Arial`;
        ctx.fillText(obs.emoji, obs.x, obs.y + obs.size - 5);

        if (!obs.passed && obs.x + obs.size < player.x) {
          obs.passed = true;
          gameRef.current.score += 10;
          setScore(gameRef.current.score);
        }

        const hitMargin = 10;
        if (
          player.x < obs.x + obs.size - hitMargin &&
          player.x + player.size - hitMargin > obs.x &&
          player.y < obs.y + obs.size - hitMargin &&
          player.y + player.size - hitMargin > obs.y
        ) {
          gameRef.current.isGameOver = true;
          setGameState('GAMEOVER');
          if (gameRef.current.score > highScore) {
            setHighScore(gameRef.current.score);
            localStorage.setItem('deepfense_highscore', gameRef.current.score.toString());
          }
        }
      }
      
      obstacles = obstacles.filter(obs => obs.x + obs.size > 0);

      if (!gameRef.current.isGameOver) {
        animationId = requestAnimationFrame(loop);
      }
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouch);
      canvas.removeEventListener('mousedown', jump);
    };
  }, [gameState]);

  return (
    <div className="bg-surface border-2 border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden mb-16 animate-in slide-in-from-bottom-8 duration-500">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-20">
          <X size={16} />
      </button>

      <div className="flex justify-between items-center mb-4 font-mono text-sm relative z-10 px-2">
         <div className="flex items-center gap-2 font-bold text-white uppercase"><Gamepad2 className="text-orange-500" size={18}/> DEEPFAKE RUNNER</div>
         <div className="flex items-center gap-4">
             <div className="text-gray-500 font-bold hidden sm:block">HI-SCORE: <span className="text-white">{highScore}</span></div>
             <div className="text-primary font-bold">SCORE: <span className="text-xl text-white">{score}</span></div>
         </div>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-black cursor-pointer shadow-inner">
         <canvas ref={canvasRef} className="w-full block touch-none" />
         
         {gameState === 'START' && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="text-4xl mb-4">🌴 🛡️ ☀️</div>
              <button onClick={startMatch} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                <Play size={16}/> {lang === 'vi' ? 'CHẠY TRỐN AI' : 'START RUNNING'}
              </button>
              <p className="text-gray-400 text-[10px] mt-4 font-mono">
                {lang === 'vi' ? '[ BẤM SPACE HOẶC CHẠM MÀN HÌNH ĐỂ NHẢY ]' : '[ PRESS SPACE OR TAP SCREEN TO JUMP ]'}
              </p>
           </div>
         )}

         {gameState === 'GAMEOVER' && (
           <div className="absolute inset-0 bg-red-900/60 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300">
              <ShieldAlert size={48} className="text-red-500 mb-2 animate-bounce" />
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter mb-4">{lang === 'vi' ? 'BẠN ĐÃ BỊ LỪA!' : 'SCAMMED!'}</h3>
              <button onClick={startMatch} className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2">
                <RotateCcw size={16}/> {lang === 'vi' ? 'CHƠI LẠI' : 'TRY AGAIN'}
              </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default DeepfakeRunner;