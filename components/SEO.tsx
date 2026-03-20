import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  lang: Language;
}

const SEO: React.FC<SEOProps> = ({ title, description, lang }) => {
  const defaultTitle = 'DEEPFENSE.ONLINE - Hệ thống nhận diện Deepfake & AI Scam';
  const defaultDesc = lang === 'vi' 
    ? 'Nền tảng huấn luyện và giám sát an ninh mạng. Công cụ quét rủi ro lừa đảo Deepfake, AI Voice và bảo vệ cộng đồng trên không gian số.'
    : 'Cybersecurity monitoring and training platform. Scan for Deepfake risks, AI Voice scams, and protect yourself online.';
  const siteUrl = 'https://deepfense.online'; // Thay bằng tên miền thật của bạn

  const seoTitle = title ? `${title} | DEEPFENSE` : defaultTitle;
  const seoDesc = description || defaultDesc;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      
      {/* Open Graph / Facebook / Zalo */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:image" content={`${siteUrl}/assets/poster.jpg`} />

      {/* Keywords cho Google */}
      <meta name="keywords" content="deepfake, lừa đảo AI, bảo mật, an ninh mạng, quét deepfake, deepfake scanner, nhận diện khuôn mặt giả, VKU" />
    </Helmet>
  );
};

export default SEO;