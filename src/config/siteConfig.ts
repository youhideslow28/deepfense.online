export interface SiteConfig {
  marquee: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  academyTitle: string;
  academySummary: string;
  footerSummary: string;
  factOne: string;
  factTwo: string;
  factThree: string;
  seasonalEnabled: boolean;
  aiAgentEnabled: boolean;
  leaderboardEnabled: boolean;
  status?: 'draft' | 'published';
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  marquee: 'Chào mừng bạn đến với DEEPFENSE 3.0 - nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI',
  heroTitle: 'Huấn luyện nhận diện deepfake',
  heroSubtitle: 'Học cách nhận biết video, hình ảnh và giọng nói giả mạo AI. Trang bị kỹ năng tự vệ trước lừa đảo số bằng bài học ngắn, thử thách mô phỏng và điểm thưởng DPF.',
  primaryCta: 'Thử thách ngay',
  secondaryCta: 'Bắt đầu học',
  academyTitle: 'DEEPFENSE Academy',
  academySummary: 'Một giọng nói quen thuộc, một video gấp gáp, một tin nhắn đòi chuyển tiền. Chỉ vài phút học đúng cách có thể giúp bạn dừng lại, kiểm chứng và không tiếp tay cho nội dung giả.',
  footerSummary: 'DEEPFENSE là nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI, tập trung vào học qua thử thách, mô phỏng tình huống, phản hồi tức thì và chứng nhận năng lực số cho cộng đồng học sinh, sinh viên.',
  factOne: 'Deepfake thường đánh vào cảm xúc gấp gáp trước khi người xem kịp kiểm chứng.',
  factTwo: 'Một cuộc gọi video hoặc giọng nói quen thuộc vẫn cần được xác minh qua kênh độc lập.',
  factThree: 'Dừng lại vài phút để kiểm tra nguồn có thể ngăn một giao dịch hoặc chia sẻ sai.',
  seasonalEnabled: true,
  aiAgentEnabled: true,
  leaderboardEnabled: true,
  status: 'published',
};
