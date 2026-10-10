import { PROJECTS } from '../../data/projects.js';
import { PAGES } from '../../data/content.js';

export function resolvePortfolioPage({ page: rawPage, sub, projects = PROJECTS, pages = PAGES }) {
  const idx = projects.findIndex((project) => project.id === sub);
  const detail = rawPage === 'projects' && idx > -1;
  const page = rawPage === 'projects' || pages[rawPage] ? rawPage : 'home';

  return { page, detail, idx };
}
