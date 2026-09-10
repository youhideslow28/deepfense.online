export type DeepfenseExperience = 'portal' | 'main' | 'family';

export const DEEPFENSE_DOMAINS: Record<DeepfenseExperience, string> = {
  portal: 'deepfense.online',
  main: 'main.deepfense.online',
  family: 'family.deepfense.online',
};

const PRODUCTION_HOSTS: Record<DeepfenseExperience, string[]> = {
  portal: ['deepfense.online', 'www.deepfense.online'],
  main: ['main.deepfense.online'],
  family: ['family.deepfense.online'],
};

const normalizeHostname = (hostname?: string) =>
  (hostname || (typeof window !== 'undefined' ? window.location.hostname : '')).toLowerCase();

export const resolveDeepfenseExperience = (hostname?: string): DeepfenseExperience => {
  const host = normalizeHostname(hostname);

  if (PRODUCTION_HOSTS.portal.includes(host)) return 'portal';
  if (PRODUCTION_HOSTS.main.includes(host)) return 'main';
  if (PRODUCTION_HOSTS.family.includes(host)) return 'family';

  return 'main';
};

export const isDeepfenseProductionHost = (hostname?: string) => {
  const host = normalizeHostname(hostname);
  return Object.values(PRODUCTION_HOSTS).some((hosts) => hosts.includes(host));
};

export const getExperienceHref = (experience: DeepfenseExperience, hostname?: string) => {
  if (isDeepfenseProductionHost(hostname)) {
    return `https://${DEEPFENSE_DOMAINS[experience]}`;
  }

  const localPaths: Record<DeepfenseExperience, string> = {
    portal: '/portal',
    main: '/',
    family: '/family',
  };

  return localPaths[experience];
};
