import { useContext } from 'react';
import { CFG } from '../../utils/config.js';
import { PALS } from '../../palettes.js';
import { ThemeCtx } from '../../theme.jsx';
import { useGuide } from '../guide/Guide.jsx';

const LINKS = [
  ['home', '#/', 'Home', 'Back to the landing page.'],
  ['projects', '#/projects', 'Projects', 'My five projects, as floating objects.'],
  ['experience', '#/experience', 'Experience', 'Where I have worked and studied.'],
  ['profile', '#/profile', 'Profile', 'Gen AI, AI/ML, Full Stack and my skills.'],
  ['contact', '#/contact', 'Contact', 'Email, phone and a message form.'],
  ['resume', '#/resume', 'Resume', 'Download my resume as a PDF.'],
];

export default function Header({ page }) {
  const { p, m, acc, setTheme } = useContext(ThemeCtx);
  const { say, mood, talking } = useGuide();
  const keys = Object.keys(PALS);
  const go = (np, nm) => { setTheme({ p: np, m: nm }); say(`Theme: ${PALS[np][0]}, ${nm}.`); };

  return (
    <header className="glass">
      <div className="mini">
        <div className="avatar-photo">
          <img src={CFG.headerPortrait} alt={`${CFG.name} portrait`} />
        </div>
      </div>
      <div><b>{CFG.name}</b><small>{CFG.tagline}</small></div>
      <nav>
        {LINKS.map(([k, href, label, tip]) => (
          <a key={k} href={href} aria-current={page === k ? 'page' : undefined} data-tip={tip}>{label}</a>
        ))}
      </nav>
      <div className="tb">
        <button type="button" aria-label="Switch between light and dark" data-tip="Switch between dark and light."
          onClick={() => go(p, m === 'dark' ? 'light' : 'dark')}>{m === 'dark' ? '◐' : '◑'}</button>
        <button type="button" aria-label="Change color palette" data-tip="Try the next color palette."
          onClick={() => go(keys[(keys.indexOf(p) + 1) % keys.length], m)}><i style={{ background: acc }} /></button>
      </div>
    </header>
  );
}
