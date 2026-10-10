// All links and contact details come from .env (VITE_* variables).
const e = import.meta.env;

export const CFG = {
  name: e.VITE_NAME || 'Your Name',
  tagline: e.VITE_TAGLINE || '',
  email: e.VITE_EMAIL || '',
  phone: e.VITE_PHONE || '',
  linkedin: e.VITE_LINKEDIN_URL || '',
  github: e.VITE_GITHUB_URL || '',
  location: e.VITE_LOCATION || '',
  resume: e.VITE_RESUME_URL || '/resume.pdf',
  portrait: e.VITE_PORTRAIT_URL || '/portrait.webp',
  headerPortrait: e.VITE_HEADER_PORTRAIT_URL || '/portrait-header.jpg',
};

export const shortUrl = (u) => u.replace(/^https?:\/\/(www\.)?/, '');
export const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '');
