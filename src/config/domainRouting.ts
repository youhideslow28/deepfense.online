export type DeepfenseExperience = 'portal' | 'main' | 'family';
export type FamilyAudience = 'young' | 'old';

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

export const getFamilyRootPath = (hostname?: string) =>
  resolveDeepfenseExperience(hostname) === 'family' ? '/' : '/family';

export const getFamilyPath = (audience: FamilyAudience, hostname?: string) =>
  resolveDeepfenseExperience(hostname) === 'family' ? `/${audience}` : `/family/${audience}`;

export const getFamilyHref = (audience: FamilyAudience, hostname?: string) => {
  if (isDeepfenseProductionHost(hostname)) {
    return `https://${DEEPFENSE_DOMAINS.family}/${audience}`;
  }

  return `/family/${audience}`;
};

export const getFamilyAudienceFromPath = (pathname: string): FamilyAudience | null => {
  const segments = pathname.toLowerCase().split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (lastSegment === 'young') return 'young';
  if (lastSegment === 'old') return 'old';
  return null;
};

export const getFamilyAudienceFromSearch = (search: string): FamilyAudience | null => {
  const params = new URLSearchParams(search);
  const audience = params.get('audience') || params.get('family');
  if (audience === 'young' || audience === 'old') return audience;
  return null;
};
