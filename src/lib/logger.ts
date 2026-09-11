/**
 * DEEPFENSE.ONLINE — Production Logger & Security Sanitizer
 * Prevents sensitive internal stack traces, Firebase schema details,
 * and noisy debug logs from leaking into browser DevTools (F12).
 */

const IS_PROD = import.meta.env.PROD;

export const logger = {
  log: (...args: unknown[]) => {
    if (!IS_PROD) {
      console.log(...args);
    }
  },

  debug: (...args: unknown[]) => {
    if (!IS_PROD) {
      console.debug(...args);
    }
  },

  warn: (message: string, ...args: unknown[]) => {
    if (!IS_PROD) {
      console.warn(message, ...args);
    }
  },

  error: (message: string, error?: unknown) => {
    if (!IS_PROD) {
      console.error(message, error);
    } else {
      // In production: Output only the high-level message without leaking full callstacks or server paths
      const safeDetail = error instanceof Error ? error.message : typeof error === 'string' ? error : '';
      console.error(`[DEEPFENSE SECURE] ${message}${safeDetail ? `: ${safeDetail.slice(0, 100)}` : ''}`);
    }
  },
};

/**
 * Initializes the developer warning and Self-XSS defense banner
 * displayed when users open browser DevTools (F12).
 */
export const initSecurityConsole = (metadata: {
  version: string;
  build_date: string;
  university: string;
  authors: { name: string; id: string; role: string }[];
}) => {
  if (typeof window === 'undefined') return;

  const styleStop = 'color: #FF0055; font-size: 38px; font-weight: 900; text-shadow: 2px 2px 0 #000; font-family: system-ui, sans-serif;';
  const styleWarning = 'color: #FFFFFF; font-size: 13px; background: #990000; padding: 8px 12px; border-radius: 4px; font-weight: 600;';
  const styleTitle = 'color: #00F0FF; font-size: 14px; font-weight: bold; background: #050B14; padding: 6px 10px; border-left: 3px solid #00F0FF;';
  const styleMeta = 'color: #94A3B8; font-size: 11px; font-family: monospace;';
  const styleAuthor = 'color: #38BDF8; font-size: 11px; font-style: italic; font-family: monospace;';

  console.log('%cDỪNG LẠI! / STOP!', styleStop);
  console.log(
    '%cĐây là tính năng trình duyệt dành riêng cho nhà phát triển. Nếu ai đó bảo bạn sao chép-dán mã vào đây để nhận DPF Coin hoặc mở khóa tính năng ẩn, đó là hình thức tấn công Self-XSS nhằm chiếm quyền điều khiển tài khoản của bạn.',
    styleWarning
  );
  console.log('%cDEEPFENSE.ONLINE — CYBERSECURITY DEFENSE PLATFORM', styleTitle);
  console.log(`%cVersion: ${metadata.version} • Build: ${metadata.build_date} • ${metadata.university}`, styleMeta);
  metadata.authors.forEach((author) => {
    console.log(`%c • ${author.name} (${author.id}) — ${author.role}`, styleAuthor);
  });
};
