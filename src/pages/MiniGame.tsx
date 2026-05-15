import React, { useEffect, useRef, useState } from 'react';
import { Language } from '@/types';
import { Play, RotateCcw, ShieldAlert, Gamepad2 } from 'lucide-react';

interface MiniGameProps {
  lang: Language;
}

const MiniGame: React.FC<MiniGameProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [highScore, setHighScore] = useState(0);
  const scoreDisplayRef = useRef<HTMLSpanElement>(null);

  // Game variables (DÃ¹ng Ref Ä‘á»ƒ khÃ´ng gÃ¢y re-render React)
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
      speed: window.innerWidth < 500 ? 4.5 : 6, // Mobile báº¯t Ä‘áº§u vá»›i tá»‘c Ä‘á»™ cháº­m hÆ¡n má»™t chÃºt
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

    // Thiáº¿t láº­p kÃ­ch thÆ°á»›c
    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth - 32;
      canvas.height = 400;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Object definitions
    const groundY = canvas.height - 50;
    // Tá»‘i Æ°u hÃ³a kÃ­ch thÆ°á»›c cho thiáº¿t bá»‹ di Ä‘á»™ng
    const isMobile = canvas.width < 500;
    const objSize = isMobile ? 32 : 40;

    const player = {
      x: isMobile ? 30 : 50,
      y: groundY - objSize,
      size: objSize,
      dy: 0,
      jumpPower: isMobile ? -12.5 : -14, // Nháº£y nháº¹ hÆ¡n trÃªn mobile Ä‘á»ƒ tiáº¿p Ä‘áº¥t nhanh hÆ¡n
      gravity: 0.8,
      grounded: true,
    };

    let obstacles: { x: number; y: number; size: number; emoji: string; passed: boolean }[] = [];
    const obstacleTypes = ['ðŸŽ­', 'ðŸŽ™ï¸', 'ðŸ”—']; // Deepfake Face, AI Voice, Scam Link

    // CÃ¢y dá»«a ná»n (Parallax Summer Background)
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

    // Äiá»u khiá»ƒn
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
    canvas.addEventListener('mousedown', jump); // Chuá»™t trÃ¡i cÅ©ng tÃ­nh lÃ  nháº£y

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

      // XÃ³a canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // TÄƒng Ä‘á»™ khÃ³ dáº§n (Endless & Impossible mode)
      gameRef.current.frames++;
      
      // TÄƒng tá»‘c mÆ°á»£t mÃ . Trong 5-7 phÃºt (18.000 - 25.000 frames) tá»‘c Ä‘á»™ vÃ  táº§n suáº¥t spawn sáº½ táº¡o thÃ nh Impossible game
      gameRef.current.speed += 0.0005;
      if (gameRef.current.speed > 24) gameRef.current.speed = 24;

      // --- DRAW BACKGROUND (Summer Cyberpunk) ---
      // Máº·t trá»i hoÃ ng hÃ´n
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#2a0a18'); // MÃ u Ã¡nh tÃ­m hoÃ ng hÃ´n
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 120, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 42, 109, 0.2)'; // MÃ u Secondary (Há»“ng Neon)
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, groundY, 80, Math.PI, 0);
      ctx.fillStyle = 'rgba(255, 100, 0, 0.8)'; // Máº·t trá»i láº·n
      ctx.fill();

      // CÃ¢y dá»«a ná»n (Parallax)
      ctx.font = '80px Arial';
      palms.forEach(palm => {
        palm.x -= gameRef.current.speed * 0.2; // TrÃ´i cháº­m hÆ¡n tiá»n cáº£nh
        if (palm.x + palm.size < 0) palm.x = canvas.width + Math.random() * 200;
        ctx.fillText('ðŸŒ´', palm.x, groundY - 10);
      });

      // Máº·t Ä‘áº¥t dáº¡ng lÆ°á»›i Ä‘iá»‡n tá»­
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

      // Váº½ Player (Táº¥m khiÃªn)
      ctx.font = `${player.size}px Arial`;
      ctx.fillText('ðŸ›¡ï¸', player.x, player.y + player.size - 5);

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
        
        // Khoáº£ng cÃ¡ch spawn giáº£m dáº§n. Khi Ä‘áº¡t má»‘c 5-7 phÃºt, spawnTimer sáº½ nhá» hÆ¡n khoáº£ng khÃ´ng gian cá»§a 1 cÃº nháº£y -> KHÃ”NG THá»‚ QUA ÄÆ¯á»¢C
        gameRef.current.spawnTimer = Math.max(18, 120 - Math.floor(gameRef.current.frames / 150));
      }

      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameRef.current.speed;
        ctx.font = `${obs.size}px Arial`;
        ctx.fillText(obs.emoji, obs.x, obs.y + obs.size - 5);

        // TÃ­nh Ä‘iá»ƒm khi vÆ°á»£t qua
        if (!obs.passed && obs.x + obs.size < player.x) {
          obs.passed = true;
          gameRef.current.score += 10;
          if (scoreDisplayRef.current) scoreDisplayRef.current.innerText = gameRef.current.score.toString();
        }

        // XÃ©t va cháº¡m (Hitbox thu nhá» má»™t chÃºt Ä‘á»ƒ game dá»… thá»Ÿ hÆ¡n)
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
      
      // Dá»n rÃ¡c
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
          {lang === 'vi' ? 'CHáº Y TRá»N DEEPFAKE' : 'DEEPFAKE RUNNER'}
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
                <div className="text-5xl mb-4">ðŸŒ´ ðŸ›¡ï¸ â˜€ï¸</div>
                <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-widest mb-6 text-center px-4">
                  {lang === 'vi' ? 'Nháº£y qua cÃ¡c cáº¡m báº«y AI Ä‘á»ƒ sinh tá»“n!' : 'Jump over AI traps to survive!'}
                </h3>
                <button onClick={startMatch} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <Play size={16}/> {lang === 'vi' ? 'Báº®T Äáº¦U CHáº Y' : 'START RUNNING'}
                </button>
                <p className="text-gray-400 text-[10px] mt-6 font-mono">
                  {lang === 'vi' ? '[ Báº¤M SPACE HOáº¶C CHáº M MÃ€N HÃŒNH Äá»‚ NHáº¢Y ]' : '[ PRESS SPACE OR TAP SCREEN TO JUMP ]'}
                </p>
             </div>
           )}

           {gameState === 'GAMEOVER' && (
             <div className="absolute inset-0 bg-red-900/40 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300">
                <ShieldAlert size={64} className="text-red-500 mb-4 animate-bounce" />
                <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
                  {lang === 'vi' ? 'Báº N ÄÃƒ Bá»Š Lá»ªA!' : 'SCAMMED!'}
                </h3>
                <p className="text-red-200 text-sm mb-8 px-4 text-center max-w-md">
                  {lang === 'vi' 
                    ? 'Chá»‰ má»™t phÃºt lÆ¡ lÃ , báº¡n Ä‘Ã£ trá»Ÿ thÃ nh náº¡n nhÃ¢n cá»§a Deepfake. HÃ£y luÃ´n giá»¯ khiÃªn báº£o vá»‡ (Sá»± cáº£nh giÃ¡c) tháº­t cháº¯c nhÃ©!' 
                    : 'Just one moment of carelessness, and you became a victim of Deepfake. Keep your shield (Vigilance) up!'}
                </p>
                <button onClick={startMatch} className="bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2 shadow-2xl">
                  <RotateCcw size={16}/> {lang === 'vi' ? 'CHÆ I Láº I Tá»ª Äáº¦U' : 'TRY AGAIN'}
                </button>
             </div>
           )}
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-[10px] font-mono text-gray-500">
            <div className="flex items-center gap-2">ðŸ›¡ï¸ = {lang === 'vi' ? 'Báº¡n (Cáº£nh giÃ¡c)' : 'You (Vigilance)'}</div>
            <div className="flex items-center gap-2">ðŸŽ­ = {lang === 'vi' ? 'Cuá»™c gá»i giáº£ máº¡o' : 'Fake Call'}</div>
            <div className="flex items-center gap-2">ðŸŽ™ï¸ = {lang === 'vi' ? 'Giá»ng nÃ³i AI' : 'AI Voice'}</div>
            <div className="flex items-center gap-2">ðŸ”— = {lang === 'vi' ? 'Link Ä‘á»™c háº¡i' : 'Malicious Link'}</div>
        </div>
      </div>
    </div>
  );
};

export default MiniGame;
