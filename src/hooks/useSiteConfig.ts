import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/config/siteConfig';

const mergePublishedConfig = (data: Partial<SiteConfig>): SiteConfig => ({
  ...DEFAULT_SITE_CONFIG,
  ...data,
  seasonalEnabled: typeof data.seasonalEnabled === 'boolean' ? data.seasonalEnabled : DEFAULT_SITE_CONFIG.seasonalEnabled,
  aiAgentEnabled: typeof data.aiAgentEnabled === 'boolean' ? data.aiAgentEnabled : DEFAULT_SITE_CONFIG.aiAgentEnabled,
  leaderboardEnabled: typeof data.leaderboardEnabled === 'boolean' ? data.leaderboardEnabled : DEFAULT_SITE_CONFIG.leaderboardEnabled,
});

export const useSiteConfig = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'site_config', 'main'), (snapshot) => {
      if (!snapshot.exists()) {
        setSiteConfig(DEFAULT_SITE_CONFIG);
        return;
      }

      const data = snapshot.data() as Partial<SiteConfig>;
      setSiteConfig(data.status === 'published' ? mergePublishedConfig(data) : DEFAULT_SITE_CONFIG);
    }, () => {
      setSiteConfig(DEFAULT_SITE_CONFIG);
    });

    return () => unsubscribe();
  }, []);

  return siteConfig;
};
