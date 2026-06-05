import React, { useRef, useMemo } from 'react';
import { Language } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MonitorPlay, Mic, Video, Sparkles, ChevronDown } from 'lucide-react';
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
    titleVi: 'Khởi Nguồn Deepfake',
    titleEn: 'The Origin of Deepfake',
    descVi: 'Thuật ngữ "Deepfake" chính thức ra đời trên Reddit. Những ứng dụng hoán đổi khuôn mặt đầu tiên xuất hiện, dù còn thô sơ nhưng đã bộc lộ tiềm năng gây nhiễu loạn thông tin toàn cầu.',
    descEn: 'The term "Deepfake" was born on Reddit. First face-swap apps appeared, crude but showing massive potential for misinformation.',
    icon: MonitorPlay,
    color: 'text-cyan-400',
    shadow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]'
  },
  {
    year: '2020',
    titleVi: 'Sự Trỗi Dậy Của Âm Thanh',
    titleEn: 'The Rise of AI Voice',
    descVi: 'Công nghệ giả mạo giọng nói (Voice Cloning) đạt bước tiến lớn. Các công cụ mã nguồn mở như DeepfaceLab giúp việc tạo video giả mạo trở nên phổ biến và tinh vi hơn.',
    descEn: 'Voice Cloning technology took a giant leap. Open-source tools like DeepfaceLab made high-quality fakes accessible and more sophisticated.',
    icon: Mic,
    color: 'text-emerald-400',
    shadow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]'
  },
  {
    year: '2023',
    titleVi: 'Kỷ Nguyên Thời Gian Thực',
    titleEn: 'Real-time Era',
    descVi: 'Deepfake bắt đầu xâm nhập vào các cuộc gọi video trực tiếp. AI tạo sinh bùng nổ với Stable Diffusion và Midjourney, xóa nhòa ranh giới trong ảnh chụp và livestream.',
    descEn: 'Deepfakes entered live video calls. Generative AI exploded with Stable Diffusion and Midjourney, blurring lines in photos and live streams.',
    icon: Video,
    color: 'text-orange-400',
    shadow: 'shadow-[0_0_30px_rgba(251,146,60,0.2)]'
  },
  {
    year: '2025',
    titleVi: 'Sự Hoàn Hảo Đáng Sợ',
    titleEn: 'Terrifying Perfection',
    descVi: 'Với sự ra đời của Sora và các mô hình video AI thế hệ mới, Deepfake đạt độ chân thực tuyệt đối. Việc phân biệt thật - giả trở thành thử thách lớn nhất của nhân loại.',
    descEn: 'With Sora and next-gen AI video models, Deepfakes reached absolute realism. Distinguishing truth from lies became humanity\'s greatest challenge.',
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
    <group rotation={[0, 0, Math.PI / 4]} position={[0, 0.45, 0]}>
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
        // Fade out background at the very end of the timeline
        const fadeStart = 0.85;
        if (self.progress > fadeStart) {
          gsap.to('.sticky-bg', { opacity: 1 - (self.progress - fadeStart) / (1 - fadeStart), duration: 0.05, overwrite: 'auto' });
        } else {
          gsap.to('.sticky-bg', { opacity: 1, duration: 0.05, overwrite: 'auto' });
        }
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>('.era-card');
    cards.forEach((card, index) => {
      const isIntro = index === 0;

      gsap.set(card, {
        scale: isIntro ? 1 : 0.7,
        opacity: isIntro ? 1 : 0,
        filter: isIntro ? 'blur(0px)' : 'blur(12px)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: isIntro ? 'top top' : 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      if (isIntro) {
        tl.to(card, {
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)',
          ease: 'power2.in',
        });
      } else {
        tl.to(card, {
          scale: 1.15,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.inOut',
        }).to(card, {
          scale: 0.7,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'power2.inOut',
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full">
      
      {/* Sticky 3D Background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0 sticky-bg">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <NeuralSphere progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Scrollable Overlay Content (drives the height of the container) */}
      <div className="relative z-20 -mt-[100vh] w-full pointer-events-none">
        
        {/* Intro Section */}
        <div className="flex h-screen items-start justify-center pt-[25vh]">
          <div className="text-center era-card px-4">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tight mix-blend-difference leading-[1.6]" style={{ fontFamily: "var(--font-display)" }}>
              {lang === 'vi' ? (
                <>
                  Deepfake đã phát triển<br /><span className="mt-2 block">như thế nào?</span>
                </>
              ) : (
                'How Deepfake Has Evolved'
              )}
            </h2>
            <div className="mt-8 inline-block px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <p className="text-cyan-400 tracking-[0.12em] text-xs md:text-sm uppercase font-bold animate-pulse" style={{ fontFamily:"var(--font-display)" }}>
                {lang === 'vi' ? 'Cuộn xuống để du hành thời gian' : 'Scroll down to time travel'}
              </p>
            </div>
            <div className="flex justify-center mt-6 text-cyan-400/60 animate-bounce">
              <ChevronDown size={32} />
            </div>
          </div>
        </div>

        {ERAS.map((era, index) => (
          <div 
            key={index} 
            className="flex h-screen items-center justify-center px-4"
          >
            <div className={`era-card relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl max-w-2xl w-full text-center ${era.shadow}`}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <era.icon className={era.color} size={24} />
              </div>
              <span className={`text-7xl font-black opacity-20 absolute -top-4 -left-4 ${era.color} pointer-events-none`} style={{ fontFamily:"var(--font-display)" }}>
                {era.year}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4" style={{ fontFamily: "var(--font-display)" }}>
                {lang === 'vi' ? era.titleVi : era.titleEn}
              </h3>
              <p className="text-gray-300 md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                {lang === 'vi' ? era.descVi : era.descEn}
              </p>
            </div>
          </div>
        ))}

        <div className="h-[20vh]" /> {/* Spacer at bottom */}
      </div>

    </div>
  );
};

export default DeepfakeTimeline;
