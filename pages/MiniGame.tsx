import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { Play, RotateCcw, ShieldAlert, Gamepad2 } from 'lucide-react';

interface MiniGameProps {
  lang: Language;
}

const MiniGame: React.FC<MiniGameProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [highScore, setHighScore] = useState(0);
  const scoreDisplayRef = useRef<HTMLSpanElement>(null);

  // Game variables (Dùng Ref để không gây re-render React)
  const gameRef = useRef({
    frames: 0,
    speed: 6,
    score: 0,
    isGameOver: false,
    spawnTimer: 0,
  });

  const startMatch = () => {
    setGameState('PLAYING');
    gameRef.current = {
      frames: 0,
      speed: window.innerWidth < 500 ? 4.5 : 6, // Mobile bắt đầu với tốc độ chậm hơn một chút
      score: 0,
      isGameOver: false,
      spawnTimer: 0,
    };
    if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = "0";
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

    // Thiết lập kích thước
    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth - 32;
      canvas.height = 400;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Object definitions
    const groundY = canvas.height - 50;
    // Tối ưu hóa kích thước cho thiết bị di động
    const isMobile = canvas.width < 500;
    const objSize = isMobile ? 32 : 40;

    const player = {
      x: isMobile ? 30 : 50,
      y: groundY - objSize,
      size: objSize,
      dy: 0,
      jumpPower: isMobile ? -12.5 : -14, // Nhảy nhẹ hơn trên mobile để tiếp đất nhanh hơn
      gravity: 0.8,
      grounded: true,
    };

    let obstacles: { x: number; y: number; size: number; emoji: string; passed: boolean }[] = [];
    const obstacleTypes = ['🎭', '🎙️', '🔗']; // Deepfake Face, AI Voice, Scam Link

    // Cây dừa nền (Parallax Summer Background)
    let palms = [
      { x: canvas.width * 0.5, size: 80 },
      { x: canvas.width * 1.2, size: 100 }
    ];

    const jump = () => {
      if (player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
      }
    };

    // Điều khiển
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
    canvas.addEventListener('mousedown', jump); // Chuột trái cũng tính là nhảy

    let animationId: number;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const loop = (currentTime: number) => {
      if (gameRef.current.isGameOver) return;
      animationId = requestAnimationFrame(loop);

      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;
      lastTime = currentTime - (deltaTime % interval);

      // Xóa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Tăng độ khó dần (Endless & Impossible mode)
      gameRef.current.frames++;
      
      // Tăng tốc mượt mà. Trong 5-7 phút (18.000 - 25.000 frames) tốc độ và tần suất spawn sẽ tạo thành Impossible game
      gameRef.current.speed += 0.0005;
      if (gameRef.current.speed > 24) gameRef.current.speed = 24;

      // --- DRAW BACKGROUND (Summer Cyberpunk) ---
      // Mặt trời hoàng hôn
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#2a0a18'); // Màu ánh tím hoàng hôn
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 120, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 42, 109, 0.2)'; // Màu Secondary (Hồng Neon)
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 80, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 100, 0, 0.8)'; // Mặt trời lặn
      ctx.fill();

      // Cây dừa nền (Parallax)
      ctx.font = '80px Arial';
      palms.forEach(palm => {
        palm.x -= gameRef.current.speed * 0.2; // Trôi chậm hơn tiền cảnh
        if (palm.x + palm.size < 0) palm.x = canvas.width + Math.random() * 200;
        ctx.fillText('🌴', palm.x, groundY - 10);
      });

      // Mặt đất dạng lưới điện tử
      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(0, groundY, canvas.width, 2);
      for(let i = 0; i < canvas.width; i+=40) {
         const offset = (gameRef.current.frames * gameRef.current.speed) % 40;
         ctx.fillRect(i - offset, groundY, 2, canvas.height - groundY);
      }

      // --- UPDATE PLAYER ---
      player.dy += player.gravity;
      player.y += player.dy;
      if (player.y >= groundY - player.size) {
        player.y = groundY - player.size;
        player.dy = 0;
        player.grounded = true;
      }

      // Vẽ Player (Tấm khiên)
      ctx.font = `${player.size}px Arial`;
      ctx.fillText('🛡️', player.x, player.y + player.size - 5);

      // --- OBSTACLES ---
      gameRef.current.spawnTimer--;
      if (gameRef.current.spawnTimer <= 0) {
        obstacles.push({
          x: canvas.width,
          y: groundY - objSize,
          size: objSize,
          emoji: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
          passed: false
        });
        
        // Khoảng cách spawn giảm dần. Khi đạt mốc 5-7 phút, spawnTimer sẽ nhỏ hơn khoảng không gian của 1 cú nhảy -> KHÔNG THỂ QUA ĐƯỢC
        gameRef.current.spawnTimer = Math.max(18, 120 - Math.floor(gameRef.current.frames / 150));
      }

      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameRef.current.speed;
        ctx.font = `${obs.size}px Arial`;
        ctx.fillText(obs.emoji, obs.x, obs.y + obs.size - 5);

        // Tính điểm khi vượt qua
        if (!obs.passed && obs.x + obs.size < player.x) {
          obs.passed = true;
          gameRef.current.score += 10;
          if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = gameRef.current.score.toString();
        }

        // Xét va chạm (Hitbox thu nhỏ một chút để game dễ thở hơn)
        const hitMargin = isMobile ? 8 : 10;
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
      
      // Dọn rác
      obstacles = obstacles.filter(obs => obs.x + obs.size > 0);

    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouch, { passive: false } as EventListenerOptions);
      canvas.removeEventListener('mousedown', jump);
    };
  }, [gameState]);

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
          <Gamepad2 className="text-primary" size={36} />
          {lang === 'vi' ? 'CHẠY TRỐN DEEPFAKE' : 'DEEPFAKE RUNNER'}
        </h2>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{lang === 'vi' ? 'SUMMER EDITION' : 'SUMMER EDITION'}</p>
      </div>

      <div className="bg-surface border-2 border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-4 font-mono text-sm">
           <div className="text-primary font-bold">SCORE: <span ref={scoreDisplayRef} className="text-2xl text-white">0</span></div>
           <div className="text-gray-500 font-bold">HI-SCORE: <span className="text-xl text-white">{highScore}</span></div>
        </div>

        {/* GAME CANVAS */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-black cursor-pointer shadow-inner">
           <canvas ref={canvasRef} className="w-full block touch-none" />
           
           {/* OVERLAYS */}
           {gameState === 'START' && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">🌴 🛡️ ☀️</div>
                <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-widest mb-6 text-center px-4">
                  {lang === 'vi' ? 'Nhảy qua các cạm bẫy AI để sinh tồn!' : 'Jump over AI traps to survive!'}
                </h3>
                <button onClick={startMatch} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <Play size={16}/> {lang === 'vi' ? 'BẮT ĐẦU CHẠY' : 'START RUNNING'}
                </button>
                <p className="text-gray-400 text-[10px] mt-6 font-mono">
                  {lang === 'vi' ? '[ BẤM SPACE HOẶC CHẠM MÀN HÌNH ĐỂ NHẢY ]' : '[ PRESS SPACE OR TAP SCREEN TO JUMP ]'}
                </p>
             </div>
           )}

           {gameState === 'GAMEOVER' && (
             <div className="absolute inset-0 bg-red-900/40 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300">
                <ShieldAlert size={64} className="text-red-500 mb-4 animate-bounce" />
                <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
                  {lang === 'vi' ? 'BẠN ĐÃ BỊ LỪA!' : 'SCAMMED!'}
                </h3>
                <p className="text-red-200 text-sm mb-8 px-4 text-center max-w-md">
                  {lang === 'vi' 
                    ? 'Chỉ một phút lơ là, bạn đã trở thành nạn nhân của Deepfake. Hãy luôn giữ khiên bảo vệ (Sự cảnh giác) thật chắc nhé!' 
                    : 'Just one moment of carelessness, and you became a victim of Deepfake. Keep your shield (Vigilance) up!'}
                </p>
                <button onClick={startMatch} className="bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2 shadow-2xl">
                  <RotateCcw size={16}/> {lang === 'vi' ? 'CHƠI LẠI TỪ ĐẦU' : 'TRY AGAIN'}
                </button>
             </div>
           )}
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-[10px] font-mono text-gray-500">
            <div className="flex items-center gap-2">🛡️ = {lang === 'vi' ? 'Bạn (Cảnh giác)' : 'You (Vigilance)'}</div>
            <div className="flex items-center gap-2">🎭 = {lang === 'vi' ? 'Cuộc gọi giả mạo' : 'Fake Call'}</div>
            <div className="flex items-center gap-2">🎙️ = {lang === 'vi' ? 'Giọng nói AI' : 'AI Voice'}</div>
            <div className="flex items-center gap-2">🔗 = {lang === 'vi' ? 'Link độc hại' : 'Malicious Link'}</div>
        </div>
      </div>
    </div>
  );
};

export default MiniGame;