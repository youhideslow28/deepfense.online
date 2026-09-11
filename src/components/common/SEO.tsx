import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types';

interface SEOProps {
  title?: string;
  description?: string;
  lang: Language;
}

const SEO: React.FC<SEOProps> = ({ title, description, lang }) => {
  const defaultTitle = 'DEEPFENSE.ONLINE - Huấn luyện nhận diện Deepfake & AI Scam';
  const defaultDesc = lang === 'vi' 
    ? 'Nền tảng huấn luyện nhận diện deepfake, AI voice scam và tự vệ trước lừa đảo công nghệ cao.'
    : 'Training platform for deepfake awareness, AI voice scams, and high-tech fraud prevention.';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://deepfense.online';

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
      <meta name="keywords" content="deepfake education, lừa đảo AI, bảo mật, an ninh mạng, nhận diện deepfake, AI scam awareness, content provenance, VKU" />
    </Helmet>
  );
};

export default SEO;
