import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { Play, RotateCcw, ShieldAlert, Crosshair, X, Heart, Trophy } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface DeepfakeRunnerProps {
  lang: Language;
  onClose: () => void;
}

interface LeaderboardEntry {
  name: string;
  score: number;
}

const DeepfakeRunner: React.FC<DeepfakeRunnerProps> = ({ lang, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  
  // Leaderboard States
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isEligibleForLeaderboard, setIsEligibleForLeaderboard] = useState(false);

  const gameRef = useRef({
    frames: 0,
    score: 0,
    health: 3,
    isGameOver: false,
    playerX: 0,
    weaponLevel: 1,
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
      weaponLevel: 1,
    };
  };

  useEffect(() => {
    // Load Leaderboard từ Firebase Firestore realtime
    const q = query(collection(db, "minigame_leaderboard"), orderBy("score", "desc"), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lbData: LeaderboardEntry[] = [];
      snapshot.forEach((doc) => {
        lbData.push({ name: doc.data().name, score: doc.data().score });
      });
      
      if (lbData.length === 0) {
         // Dữ liệu mẫu nếu chưa có ai chơi
         setLeaderboard([
             { name: 'NEO_HACKER', score: 500 },
             { name: 'CYBER_COP', score: 300 },
             { name: 'ROOKIE', score: 100 }
         ]);
      } else {
         setLeaderboard(lbData);
      }
    });

    return () => unsubscribe();
  }, []);

  // Xử lý lưu điểm lên Bảng Xếp Hạng
  const handleSubmitScore = async () => {
      if (!playerName.trim()) return;
      
      try {
          await addDoc(collection(db, "minigame_leaderboard"), {
              name: playerName.toUpperCase().slice(0, 10),
              score: gameRef.current.score,
              played_at: serverTimestamp()
          });
          setIsEligibleForLeaderboard(false);
          setPlayerName('');
      } catch (error) {
          console.error("Error saving score:", error);
      }
  };

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

    let bullets: { x: number, y: number, vx: number, vy: number }[] = [];
    let enemies: { x: number, y: number, size: number, speed: number, hp: number, maxHp: number, emoji: string, type: number, wobbleOffset: number }[] = [];
    let powerups: { x: number, y: number, speed: number }[] = [];
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
          const level = gameRef.current.weaponLevel;
          if (level === 1) {
              bullets.push({ x: px - 10, y: py, vx: 0, vy: 12 });
              bullets.push({ x: px + 10, y: py, vx: 0, vy: 12 });
          } else if (level === 2) {
              bullets.push({ x: px, y: py - 10, vx: 0, vy: 12 });
              bullets.push({ x: px - 15, y: py, vx: -2, vy: 12 });
              bullets.push({ x: px + 15, y: py, vx: 2, vy: 12 });
          } else {
              bullets.push({ x: px, y: py - 10, vx: 0, vy: 12 });
              bullets.push({ x: px - 15, y: py, vx: -2, vy: 12 });
              bullets.push({ x: px + 15, y: py, vx: 2, vy: 12 });
              bullets.push({ x: px - 25, y: py + 10, vx: -4, vy: 12 });
              bullets.push({ x: px + 25, y: py + 10, vx: 4, vy: 12 });
          }
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
          b.y -= b.vy;
          b.x += b.vx;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.vx * 0.05); // Xoay hướng đạn chéo sao cho tự nhiên
          ctx.fillRect(-2, 0, 4, 15);
          ctx.restore();
          if (b.y < 0 || b.x < 0 || b.x > canvas.width) bullets.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // 4. ENEMIES
      // ĐIỀU CHỈNH ĐỂ GAME KÉO DÀI KHOẢNG 5 PHÚT TƯƠNG TÁC (Thuyết trình)
      // Giả sử 60 khung hình/giây -> 3600 khung hình = 1 phút.
      const minutesPlaying = gameRef.current.frames / 3600;
      // Tăng chậm rãi ở 1-2 phút đầu, bùng nổ độ khó ở phút thứ 4-5
      const diffMultiplier = 1 + (minutesPlaying * 0.5) + Math.pow(minutesPlaying, 2) * 0.3; 
      
      if (gameRef.current.frames % Math.max(12, Math.floor(120 / diffMultiplier)) === 0) {
          const type = Math.random();
          let hp = 1, speed = 1.2 * diffMultiplier, emoji = emojis[0];
          if (type > 0.8) { hp = Math.floor(3 + minutesPlaying * 2); speed = 0.8 * diffMultiplier; emoji = '🤖'; } // Tank (Máu tăng dần theo thời gian)
          else if (type > 0.5) { speed = 2.2 * diffMultiplier; emoji = '🎙️'; } // Fast (Nhanh)

          enemies.push({
              x: Math.random() * (canvas.width - 40) + 20,
              y: -30,
              size: 25,
              speed, hp, maxHp: hp, emoji, type, wobbleOffset: Math.random() * Math.PI * 2
          });
      }

      ctx.font = '28px Arial';
      ctx.textAlign = 'center';
      for (let i = enemies.length - 1; i >= 0; i--) {
          let e = enemies[i];
          e.y += e.speed;
          
          // Wobble effect for normal enemies
          let renderX = e.x;
          if (e.maxHp === 1 && e.speed < 3) {
              renderX += Math.sin(gameRef.current.frames * 0.05 + e.wobbleOffset) * 2;
          }

          ctx.fillText(e.emoji, renderX, e.y);
          
          // HP Bar for tanks
          if (e.maxHp > 1) {
              ctx.fillStyle = 'red';
              ctx.fillRect(renderX - 10, e.y - 35, 20, 4);
              ctx.fillStyle = '#05FF00';
              ctx.fillRect(renderX - 10, e.y - 35, 20 * (Math.max(0, e.hp) / e.maxHp), 4);
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

              // 10% cơ hội rớt ra vật phẩm nâng cấp tia đạn
              if (Math.random() < 0.1) {
                  powerups.push({ x: renderX, y: e.y, speed: 2 });
              }
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
                  
                  // Kiểm tra xem có đủ điều kiện vào Top 3 Leaderboard không
                  const isTop3 = leaderboard.length < 3 || gameRef.current.score > (leaderboard[leaderboard.length - 1]?.score || 0);
                  if (isTop3 && gameRef.current.score > 0) {
                      setIsEligibleForLeaderboard(true);
                  } else {
                      setIsEligibleForLeaderboard(false);
                  }
              }
          }
      }

      // 4.5 POWERUPS VÀ XỬ LÝ ĂN ITEM
      ctx.font = '24px Arial';
      for (let i = powerups.length - 1; i >= 0; i--) {
          let p = powerups[i];
          p.y += p.speed;
          
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 15;
          ctx.fillText('⚡', p.x, p.y);
          ctx.shadowBlur = 0;
          
          // Va chạm giữa Player và Vật phẩm ⚡
          if (Math.abs(p.x - px) < 30 && Math.abs(p.y - py) < 30) {
              if (gameRef.current.weaponLevel < 3) {
                  gameRef.current.weaponLevel++;
              } else {
                  gameRef.current.score += 100; // Đã max cấp thì cộng điểm
              }
              setScore(gameRef.current.score);
              powerups.splice(i, 1);
              continue;
          }
          if (p.y > canvas.height + 20) powerups.splice(i, 1);
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
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [gameState]);

  return (
    <div className="bg-surface border-2 border-white/10 rounded-3xl p-4 md:p-6 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden mb-16 animate-in slide-in-from-bottom-8 duration-500">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-20">
          <X size={16} />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1 md:p-2">
         
         {/* --- CỘT TRÁI: KHU VỰC CHƠI GAME --- */}
         <div className="lg:col-span-2 flex flex-col">
             <div className="flex justify-between items-center mb-4 font-mono text-sm relative z-10 px-2">
                <div className="flex items-center gap-2 font-black text-primary uppercase tracking-widest"><Crosshair size={18}/> {lang === 'vi' ? 'NEURAL DEFENDER' : 'NEURAL DEFENDER'}</div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <Heart key={i} size={16} className={i < health ? "fill-secondary text-secondary" : "text-gray-700"} />
                        ))}
                    </div>
                    <div className="text-primary font-bold">SCORE: <span className="text-2xl text-white">{score}</span></div>
                </div>
             </div>

             <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black cursor-crosshair shadow-inner min-h-[350px]">
                <canvas ref={canvasRef} className="w-full block touch-none" />
                
                {gameState === 'START' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
                     <div className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">🚀</div>
                     <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-widest mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                       {lang === 'vi' ? 'TIÊU DIỆT VIRUS DEEPFAKE' : 'DESTROY DEEPFAKE VIRUS'}
                     </h3>
                     <p className="text-gray-400 text-xs md:text-sm mb-8 text-center max-w-md">
                       {lang === 'vi' ? 'Vuốt hoặc di chuyển chuột để điều khiển Tường Lửa. Nhịp độ sẽ chậm rãi ban đầu và tăng tốc dần!' : 'Swipe or move mouse to control Firewall. Starts slow, speeds up later!'}
                     </p>
                     <button onClick={startMatch} className="bg-primary text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                       <Play size={18}/> {lang === 'vi' ? 'KHỞI ĐỘNG HỆ THỐNG' : 'SYSTEM START'}
                     </button>
                  </div>
                )}

                {gameState === 'GAMEOVER' && (
                  <div className="absolute inset-0 bg-red-900/80 backdrop-blur-md flex flex-col items-center justify-center animate-in zoom-in duration-300 z-50">
                     <ShieldAlert size={56} className="text-white mb-2 animate-bounce drop-shadow-xl" />
                     <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter mb-2">
                       {lang === 'vi' ? 'HỆ THỐNG BỊ XUYÊN THỦNG!' : 'SYSTEM BREACHED!'}
                     </h3>
                     <p className="text-red-200 text-sm mb-6 px-4 text-center">
                       {lang === 'vi' ? `Bạn đã ghi được ${score} điểm.` : `You scored ${score} points.`}
                     </p>

                     {isEligibleForLeaderboard ? (
                        <div className="bg-black/60 p-5 rounded-2xl border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] flex flex-col items-center animate-in slide-in-from-bottom-4">
                           <div className="text-yellow-400 font-black mb-4 text-sm flex items-center gap-2 tracking-widest"><Trophy size={18}/> TOP 3 ACHIEVED!</div>
                           <div className="flex gap-2">
                              <input 
                                type="text" 
                                maxLength={10}
                                placeholder="ENTER NAME" 
                                className="bg-black border-2 border-white/20 text-white px-4 py-2 rounded-xl outline-none focus:border-yellow-500 text-center font-mono uppercase w-40 font-bold"
                                value={playerName}
                                onChange={e => setPlayerName(e.target.value.toUpperCase())}
                                onKeyDown={e => e.key === 'Enter' && handleSubmitScore()}
                              />
                              <button onClick={handleSubmitScore} className="bg-yellow-500 text-black px-5 py-2 font-black rounded-xl hover:bg-white transition-colors shadow-lg">SAVE</button>
                           </div>
                        </div>
                     ) : (
                        <button onClick={startMatch} className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-colors flex items-center gap-2 shadow-2xl mt-2">
                           <RotateCcw size={16}/> {lang === 'vi' ? 'PHỤC HỒI HỆ THỐNG' : 'RESTORE SYSTEM'}
                        </button>
                     )}
                  </div>
                )}
             </div>
         </div>

         {/* --- CỘT PHẢI: BẢNG XẾP HẠNG (LEADERBOARD) --- */}
         <div className="lg:col-span-1 bg-black/60 border border-primary/20 rounded-2xl p-5 flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
            
            <h3 className="text-white font-black text-center mb-6 tracking-widest uppercase flex items-center justify-center gap-2 relative z-10">
                <Trophy size={20} className="text-yellow-400"/> {lang === 'vi' ? 'BẢNG PHONG THẦN' : 'LEADERBOARD'}
            </h3>
            
            <div className="flex-1 flex flex-col gap-4 relative z-10">
                {leaderboard.map((entry, i) => (
                    <div key={i} className={`p-4 rounded-xl border relative overflow-hidden flex items-center justify-between group transition-transform hover:scale-[1.02] ${i === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-black border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : i === 1 ? 'bg-gradient-to-r from-gray-400/10 to-black border-gray-400/50' : 'bg-gradient-to-r from-orange-700/20 to-black border-orange-700/50'}`}>
                        {i === 0 && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>}
                        <div className="flex items-center gap-3">
                            <span className={`text-2xl font-black italic ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-300' : 'text-orange-500'}`}>#{i+1}</span>
                            <span className="text-white font-bold tracking-wider">{entry.name}</span>
                        </div>
                        <span className={`font-mono font-black text-lg ${i === 0 ? 'text-yellow-400' : 'text-primary'}`}>{entry.score}</span>
                    </div>
                ))}
                
                {/* Hiển thị dòng trống nếu chưa đủ 3 người */}
                {[...Array(Math.max(0, 3 - leaderboard.length))].map((_, i) => (
                    <div key={`empty-${i}`} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between opacity-50">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black italic text-gray-700">#{leaderboard.length + i + 1}</span>
                            <span className="text-gray-600 font-bold tracking-wider">---</span>
                        </div>
                        <span className="font-mono font-black text-lg text-gray-700">0</span>
                    </div>
                ))}
            </div>
         </div>
         
      </div>
    </div>
  );
};

export default DeepfakeRunner;