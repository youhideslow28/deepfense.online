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