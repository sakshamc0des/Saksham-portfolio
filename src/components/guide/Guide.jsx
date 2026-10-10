import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const GuideCtx = createContext({ say: () => {}, mood: 'happy', talking: false });
export const useGuide = () => useContext(GuideCtx);

export function Ball({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id={`bg${id}`} cx=".35" cy=".3" r=".8">
          <stop offset="0" style={{ stopColor: 'color-mix(in srgb,var(--acc) 55%,#fff)' }} />
          <stop offset=".55" style={{ stopColor: 'var(--acc)' }} />
          <stop offset="1" style={{ stopColor: 'var(--mint)' }} />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="95" rx="26" ry="4" fill="rgba(0,0,0,.35)" />
      <ellipse cx="36" cy="90" rx="9" ry="5" fill="#6a2d08" />
      <ellipse cx="64" cy="90" rx="9" ry="5" fill="#6a2d08" />
      <circle cx="50" cy="50" r="40" fill={`url(#bg${id})`} />
      <ellipse cx="34" cy="28" rx="11" ry="6" fill="#fff" opacity=".35" transform="rotate(-30 34 28)" />
      <path d="M50 11q-1-8 8-8q0 8-8 8z" fill="#6a2d08" />
      <circle cx="25" cy="57" r="6" fill="#ff5a5a" opacity=".35" />
      <circle cx="75" cy="57" r="6" fill="#ff5a5a" opacity=".35" />
      <g className="eyes">
        <ellipse cx="38" cy="45" rx="8" ry="9.5" fill="#fff" />
        <ellipse cx="62" cy="45" rx="8" ry="9.5" fill="#fff" />
        <g className="pup">
          <circle cx="38" cy="46" r="4.6" fill="#2a1208" />
          <circle cx="62" cy="46" r="4.6" fill="#2a1208" />
          <circle cx="36.5" cy="43.5" r="1.4" fill="#fff" />
          <circle cx="60.5" cy="43.5" r="1.4" fill="#fff" />
        </g>
      </g>
      <path className="bl" d="M30 30l16-2" stroke="#6a2d08" strokeWidth="3" strokeLinecap="round" />
      <path className="br" d="M54 28l16 2" stroke="#6a2d08" strokeWidth="3" strokeLinecap="round" />
      <g className="m m-happy"><path d="M42 62q8 9 16 0" stroke="#5a1f10" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
      <g className="m m-talk"><ellipse cx="50" cy="63" rx="5" ry="4" fill="#5a1f10" /></g>
      <g className="m m-worry"><path d="M42 67q8-8 16 0" stroke="#5a1f10" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
      <g className="m m-think"><circle cx="55" cy="64" r="3" fill="none" stroke="#5a1f10" strokeWidth="2.6" /></g>
      <g className="sweat"><path d="M80 32q-5 8 0 11t6-3q0-5-6-8z" fill="#7cc4e8" /></g>
    </svg>
  );
}

const IDLE = {
  home: ['Psst. Try the 01 Projects corner, or scroll to spin the portrait.', 'Four corners, four pages. Pick one.'],
  projects: ['Drag around the map. M-Scan turns hours of data entry into seconds.', 'Every project opens into six cards.'],
  detail: ['Scroll to see the next card.', 'When you are done, try another project from the bottom corners.'],
  experience: ['Scroll for the next cards. Then check the projects.', 'Seen the projects yet? Open the menu and try Talent Nebula.'],
  profile: ['Scroll for the skills. Then peek at the projects.', 'Curious what I built with these? Open Projects.'],
  contact: ['Write a message and I will open your mail app.', 'Have a project in mind? Tell me about it.'],
  resume: ['Press the button and your copy is on its way.'],
};

function Guide({ msg, page, say, talking, setTalking }) {
  const root = useRef(null), av = useRef(null), bub = useRef(null);
  const [typed, setTyped] = useState('');
  const [quiet, setQuiet] = useState(true);
  const lastAct = useRef(Date.now());
  const pageRef = useRef(page);
  pageRef.current = page;

  useEffect(() => {
    if (!msg.text) return undefined;
    setQuiet(false); setTyped(''); setTalking(true);
    let i = 0, q;
    const t = setInterval(() => {
      i += 1; setTyped(msg.text.slice(0, i));
      if (i >= msg.text.length) { clearInterval(t); setTalking(false); q = setTimeout(() => setQuiet(true), 7000); }
    }, 18);
    return () => { clearInterval(t); clearTimeout(q); };
  }, [msg.k]);

  useEffect(() => {
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let gx = innerWidth - 90, gy = innerHeight - 110, cx = innerWidth * 0.7, cy = innerHeight * 0.6, px = gx, py = gy, hop = -9999, raf;
    const mv = (e) => { cx = e.clientX; cy = e.clientY; lastAct.current = Date.now(); };
    const click = () => { hop = performance.now(); };
    addEventListener('pointermove', mv, { passive: true });
    addEventListener('pointerdown', mv, { passive: true });
    document.addEventListener('click', click);
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      const el = av.current, g = root.current, b = bub.current;
      if (!el || !g || !b) return;
      const S = el.offsetWidth || 66, H = S / 2, D = S * 3.1, ang = 0.75 + Math.sin(t / 1900) * 1.15;
      const tx = Math.min(innerWidth - H - 6, Math.max(H + 6, cx + Math.cos(ang) * D));
      const ty = Math.min(innerHeight - H - 6, Math.max(H + 78, cy + Math.sin(ang) * D * 0.75));
      const k = calm ? 0.25 : 0.065;
      gx += (tx - gx) * k; gy += (ty - gy) * k;
      const vx = gx - px, vy = gy - py; px = gx; py = gy;
      const sp = Math.hypot(vx, vy), sx = 1 + Math.min(0.2, sp * 0.025), hp = performance.now() - hop;
      let bo = -Math.abs(Math.sin(t / 120)) * Math.min(7, sp * 1.6);
      if (hp < 500) bo -= Math.sin((hp / 500) * Math.PI) * 22;
      g.style.transform = `translate3d(${gx - H}px,${gy - H}px,0)`;
      el.style.transform = `translateY(${bo}px) rotate(${Math.max(-16, Math.min(16, vx * 2.2))}deg) scale(${sx},${1 / sx})`;
      const dx = cx - gx, dy = cy - gy, n = Math.hypot(dx, dy) || 1, pup = el.querySelector('.pup');
      if (pup) pup.style.transform = `translate(${(dx / n) * 3.2}px,${(dy / n) * 2.6}px)`;
      const half = b.offsetWidth / 2;
      let off = 0;
      if (gx - half < 8) off = 8 + half - gx; else if (gx + half > innerWidth - 8) off = innerWidth - 8 - half - gx;
      b.style.transform = `translateX(calc(-50% + ${off}px))`;
      b.classList.toggle('below', gy < 200);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', mv); removeEventListener('pointerdown', mv);
      document.removeEventListener('click', click);
    };
  }, []);

  useEffect(() => {
    let last = null, tm;
    const over = (e) => {
      const el = e.target.closest ? e.target.closest('[data-tip]') : null;
      if (el === last) return;
      last = el; clearTimeout(tm);
      if (!el) return;
      tm = setTimeout(() => { lastAct.current = Date.now(); say(el.dataset.tip); }, 220);
    };
    document.addEventListener('pointerover', over);
    return () => { document.removeEventListener('pointerover', over); clearTimeout(tm); };
  }, [say]);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      if (Date.now() - lastAct.current < 14000) return;
      lastAct.current = Date.now();
      const a = IDLE[pageRef.current] || IDLE.home;
      say(a[n++ % a.length], 'think');
    }, 4000);
    return () => clearInterval(id);
  }, [say]);

  return (
    <div className="guide" ref={root} data-m={msg.mood}>
      <div className={`glass bubble${quiet ? ' quiet' : ''}`} ref={bub}><div>{typed}</div></div>
      <div className={`av${talking ? ' talk' : ''}`} data-mood={msg.mood} ref={av}><Ball id="g" /></div>
    </div>
  );
}

export function GuideProvider({ page, children }) {
  const [msg, setMsg] = useState({ text: '', mood: 'happy', k: 0 });
  const [talking, setTalking] = useState(false);
  const say = useCallback((text, mood = 'happy') => setMsg((m) => ({ text, mood, k: m.k + 1 })), []);
  return (
    <GuideCtx.Provider value={{ say, mood: msg.mood, talking }}>
      {children}
      <Guide msg={msg} page={page} say={say} talking={talking} setTalking={setTalking} />
    </GuideCtx.Provider>
  );
}
