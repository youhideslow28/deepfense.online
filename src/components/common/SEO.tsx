import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types';

interface SEOProps {
  title?: string;
  description?: string;
  lang: Language;
}

const SEO: React.FC<SEOProps> = ({ title, description, lang }) => {
  const defaultTitle = 'DEEPFENSE.ONLINE - Há»‡ thá»‘ng nháº­n diá»‡n Deepfake & AI Scam';
  const defaultDesc = lang === 'vi' 
    ? 'Ná»n táº£ng huáº¥n luyá»‡n vÃ  giÃ¡m sÃ¡t an ninh máº¡ng. CÃ´ng cá»¥ quÃ©t rá»§i ro lá»«a Ä‘áº£o Deepfake, AI Voice vÃ  báº£o vá»‡ cá»™ng Ä‘á»“ng trÃªn khÃ´ng gian sá»‘.'
    : 'Cybersecurity monitoring and training platform. Scan for Deepfake risks, AI Voice scams, and protect yourself online.';
  const siteUrl = 'https://deepfense.online'; // Thay báº±ng tÃªn miá»n tháº­t cá»§a báº¡n

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
      <meta name="keywords" content="deepfake, lá»«a Ä‘áº£o AI, báº£o máº­t, an ninh máº¡ng, quÃ©t deepfake, deepfake scanner, nháº­n diá»‡n khuÃ´n máº·t giáº£, VKU" />
    </Helmet>
  );
};

export default SEO;
