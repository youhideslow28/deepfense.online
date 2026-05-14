import React, { useRef, useMemo } from 'react';
import { Language } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MonitorPlay, Mic, Video, Sparkles } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface DeepfakeTimelineProps {
  lang: Language;
}

const ERAS = [
  {
    year: '2017',
    titleVi: 'Sự Khởi Nguồn',
    titleEn: 'The Origin',
    descVi: 'Khởi đầu từ các diễn đàn, công nghệ ghép mặt tĩnh (Face Swap) còn thô sơ và dễ dàng bị phát hiện.',
    descEn: 'Originating from forums, static face swap technology was crude and easily detectable.',
    icon: MonitorPlay,
    color: 'text-cyan-400',
    shadow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]'
  },
  {
    year: '2020',
    titleVi: 'Sự Trỗi Dậy Của Âm Thanh',
    titleEn: 'Voice Cloning Era',
    descVi: 'AI vượt qua hình ảnh, tiến tới sao chép hoàn hảo giọng nói của bất kỳ ai, mở ra kỷ nguyên mạo danh.',
    descEn: 'AI evolved beyond visuals to perfectly clone anyone\'s voice, ushering in the impersonation era.',
    icon: Mic,
    color: 'text-emerald-400',
    shadow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]'
  },
  {
    year: '2023',
    titleVi: 'Kỷ Nguyên Thời Gian Thực',
    titleEn: 'Real-time Threat',
    descVi: 'Video call lừa đảo bùng nổ. Khuôn mặt và giọng nói được thao túng trực tiếp ngay trên sóng livestream.',
    descEn: 'Video call scams exploded. Faces and voices manipulated instantly on live streams.',
    icon: Video,
    color: 'text-orange-400',
    shadow: 'shadow-[0_0_30px_rgba(251,146,60,0.2)]'
  },
  {
    year: '2025',
    titleVi: 'Sự Hoàn Hảo Đáng Sợ',
    titleEn: 'Terrifying Perfection',
    descVi: 'Thế hệ AI tạo sinh mới (Sora/Flux). Ranh giới giữa sự thật và dối trá chính thức bị xóa nhòa hoàn toàn.',
    descEn: 'The new generation of Generative AI. The boundary between truth and lies is completely erased.',
    icon: Sparkles,
    color: 'text-rose-500',
    shadow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]'
  }
];

// 3D Particle Sphere Component
const NeuralSphere = ({ progressRef }: { progressRef: React.MutableRefObject<number> }) => {
  const ref = useRef<any>(null);
  
  // Create 5000 random points in a sphere
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const progress = progressRef.current;
    
    // Base rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Scroll-driven animation
    const currentScale = 1 + (progress * 1.5);
    ref.current.scale.set(currentScale, currentScale, currentScale);
    ref.current.rotation.z = progress * Math.PI * 2;

    // Update color directly on material
    let colorHex = "#22d3ee"; // Cyan
    if (progress >= 0.25) colorHex = "#34d399"; // Emerald
    if (progress >= 0.5) colorHex = "#fb923c"; // Orange
    if (progress >= 0.75) colorHex = "#f43f5e"; // Rose

    if (ref.current.material) {
      ref.current.material.color.set(colorHex);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#22d3ee"
          size={0.02} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const DeepfakeTimeline: React.FC<DeepfakeTimelineProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Fade in text elements
    const cards = gsap.utils.toArray<HTMLElement>('.era-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full">
      
      {/* Sticky 3D Background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03080F] via-transparent to-[#03080F] z-10" />
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <NeuralSphere progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Scrollable Overlay Content (drives the height of the container) */}
      <div className="relative z-20 -mt-[100vh] w-full pointer-events-none">
        
        {/* Intro Section */}
        <div className="h-screen flex items-center justify-center">
          <div className="text-center era-card">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mix-blend-difference" style={{ fontFamily:"'Outfit', sans-serif" }}>
              {lang === 'vi' ? 'Sự Tiến Hóa' : 'The Evolution'}
            </h2>
            <p className="text-gray-300 mt-4 tracking-widest text-sm uppercase">
              {lang === 'vi' ? 'Cuộn xuống để du hành thời gian' : 'Scroll down to time travel'}
            </p>
          </div>
        </div>

        {ERAS.map((era, index) => (
          <div 
            key={index} 
            className="h-screen flex items-center justify-center px-4"
          >
            <div className={`era-card relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl max-w-2xl w-full text-center ${era.shadow}`}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <era.icon className={era.color} size={24} />
              </div>
              <span className={`text-7xl font-black opacity-20 absolute -top-4 -left-4 ${era.color} pointer-events-none`} style={{ fontFamily:"'Outfit', sans-serif" }}>
                {era.year}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
                {lang === 'vi' ? era.titleVi : era.titleEn}
              </h3>
              <p className="text-gray-300 md:text-lg leading-relaxed">
                {lang === 'vi' ? era.descVi : era.descEn}
              </p>
            </div>
          </div>
        ))}

        <div className="h-[50vh]" /> {/* Spacer at bottom */}
      </div>

    </div>
  );
};

export default DeepfakeTimeline;
