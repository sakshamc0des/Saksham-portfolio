import { useEffect } from 'react';
import { ThemeProvider } from './theme.jsx';
import { GuideProvider, useGuide } from './components/guide/Guide.jsx';
import Header from './components/layout/Header.jsx';
import { PROJECTS } from './data/projects.js';
import { PAGES } from './data/content.js';
import HomePage from './pages/HomePage.jsx';
import ProjectOverviewPage from './pages/ProjectOverviewPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import StaticPage from './pages/StaticPage.jsx';
import { useRoute } from './hooks/useRoute.js';
import { buildProjectScene } from './features/portfolio/projectScene.js';
import { resolvePortfolioPage } from './features/portfolio/resolvePageState.js';

function Shell() {
  const { page: raw, sub } = useRoute();
  const { say } = useGuide();
  const { page, detail, idx } = resolvePortfolioPage({ page: raw, sub, projects: PROJECTS, pages: PAGES });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page === 'home') say("Hi, I'm the guide. Use the four corners to explore, or scroll to spin the portrait.");
    else if (page === 'projects' && !detail) say('Click any object to open its details.');
  }, [page, sub]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { document.body.classList.toggle('scn', page !== 'home' && !(page === 'projects' && !detail)); }, [page, detail]);

  return (
    <>
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      <Header page={page} />
      {page === 'home' && <HomePage />}
      {page === 'projects' && !detail && <ProjectOverviewPage />}
      {detail && <ProjectDetailPage scene={buildProjectScene(idx)} sub={sub} />}
      {PAGES[page] && <StaticPage page={page} scene={PAGES[page]} />}
    </>
  );
}

export default function App() {
  const { page, sub } = useRoute();
  const key = page === 'projects' && sub ? 'detail' : page;
  return (
    <ThemeProvider>
      <GuideProvider page={key}>
        <Shell />
      </GuideProvider>
    </ThemeProvider>
  );
}
