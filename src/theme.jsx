import { createContext, useEffect, useState } from 'react';
import { PALS } from './palettes.js';

export const ThemeCtx = createContext(null);

const VARS = ['--bg1', '--bg2', '--ink', '--mute', '--mint', '--acc', '--accrgb', '--glass', '--edge', '--card', '--deep', '--onacc', '--sl', '--vg'];
export const palOf = (p, m) => PALS[p][m === 'light' ? 2 : 1];

function apply(p, m) {
  const a = palOf(p, m), r = document.documentElement;
  VARS.forEach((v, i) => r.style.setProperty(v, a[i]));
  r.style.setProperty('--stage', a[0]);
  r.style.colorScheme = m;
}

function load() {
  try {
    const t = JSON.parse(localStorage.getItem('th'));
    if (t && PALS[t.p]) return t;
  } catch { /* ignore */ }
  return { p: 'amber', m: 'dark' };
}

export function ThemeProvider({ children }) {
  const [t, setT] = useState(() => { const x = load(); apply(x.p, x.m); return x; });
  useEffect(() => {
    apply(t.p, t.m);
    try { localStorage.setItem('th', JSON.stringify(t)); } catch { /* ignore */ }
  }, [t]);
  const a = palOf(t.p, t.m);
  return <ThemeCtx.Provider value={{ ...t, acc: a[5], ink: a[2], setTheme: setT }}>{children}</ThemeCtx.Provider>;
}
