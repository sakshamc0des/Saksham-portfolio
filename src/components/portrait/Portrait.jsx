import { useContext, useEffect, useRef, useState } from 'react';
import { CFG } from '../../utils/config.js';
import { ThemeCtx } from '../../theme.jsx';

const GW = 150, GH = 200;
const MODES = ['dither', 'halftone', 'ascii', 'mosaic', 'engrave'];
const RAMP = ' .:-=+*#%@';
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// The photo as ~20k particles that spring back after the cursor pushes them away.
// Five render styles cycle automatically (or on click).
export default function Portrait() {
  const box = useRef(null), cv = useRef(null), api = useRef({});
  const [label, setLabel] = useState(MODES[0]);
  const { acc, ink } = useContext(ThemeCtx);
  const col = useRef({ acc, ink });
  col.current = { acc, ink };

  useEffect(() => {
    const el = box.current, canvas = cv.current, ctx = canvas.getContext('2d');
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let P = [], W = 0, H = 0, dpr = 1, cell = 1, mx = -999, my = -999, vis = true, mode = 0, lastSw = 0, raf = 0, dead = false;

    const setMode = (m, burst) => {
      mode = (m + MODES.length) % MODES.length;
      setLabel(MODES[mode]);
      lastSw = performance.now();
      if (burst) for (const p of P) { const a = Math.random() * 6.28, f = 3 + Math.random() * 9; p.vx += Math.cos(a) * f; p.vy += Math.sin(a) * f; }
      const t = document.querySelector('.tt');
      if (t) { t.classList.remove('gl'); void t.offsetWidth; t.classList.add('gl'); }
    };
    api.current.next = () => setMode(mode + 1, true);

    const size = () => {
      W = el.offsetWidth; H = el.offsetHeight;
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      cell = W / GW;
      P.forEach((p) => { p.ox = (p.gx + 0.5) * cell; p.oy = (p.gy + 0.5) * cell; });
    };

    function loop(t) {
      raf = requestAnimationFrame(loop);
      if (!vis) return;
      if (!calm && t - lastSw > 5200) setMode(mode + 1, true);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const R = Math.max(60, W * 0.17), R2 = R * R, batch = mode === 0 || mode === 1 || mode === 4;
      ctx.fillStyle = mode === 1 ? col.current.ink : col.current.acc;
      if (mode === 2) { ctx.font = `700 ${cell * 3.3}px ui-monospace,Menlo,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; }
      if (batch) ctx.beginPath();
      for (const p of P) {
        let fx = (p.ox - p.x) * 0.05, fy = (p.oy - p.y) * 0.05;
        const dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy;
        if (d < R2 && d > 1) { const n = Math.sqrt(d), k = (1 - n / R) * 4.5; fx += (dx / n) * k; fy += (dy / n) * k; }
        p.vx = (p.vx + fx) * 0.84; p.vy = (p.vy + fy) * 0.84; p.x += p.vx; p.y += p.vy;
        if (mode === 0) { if (p.pl < p.bt) continue; const r = cell * 0.5; ctx.rect(p.x - r, p.y - r, r * 2, r * 2); }
        else if (mode === 1) { if (p.gx % 2 || p.gy % 2) continue; const r = cell * (0.15 + 0.9 * Math.pow(p.l, 0.8)); ctx.moveTo(p.x + r, p.y); ctx.arc(p.x, p.y, r, 0, 6.2832); }
        else if (mode === 2) { if (p.gx % 3 || p.gy % 3) continue; const ch = RAMP[Math.floor(Math.pow(p.l, 0.8) * 9.99)]; if (ch !== ' ') ctx.fillText(ch, p.x, p.y); }
        else if (mode === 3) { if (p.gx % 2 || p.gy % 2) continue; ctx.fillStyle = p.c; ctx.fillRect(p.x - cell, p.y - cell, cell * 2 - 0.4, cell * 2 - 0.4); }
        else { if (p.gy % 3) continue; const h = cell * (0.3 + 1.8 * Math.pow(p.l, 0.9)); ctx.rect(p.x - cell * 0.5, p.y - h / 2, cell, h); }
      }
      if (batch) ctx.fill();
    }

    const img = new Image();
    img.onload = () => {
      if (dead) return;
      const o = document.createElement('canvas'); o.width = GW; o.height = GH;
      const c = o.getContext('2d', { willReadFrequently: true });
      c.drawImage(img, 0, 0, GW, GH);
      const d = c.getImageData(0, 0, GW, GH).data;
      for (let y = 0; y < GH; y++)
        for (let x = 0; x < GW; x++) {
          const i = (y * GW + x) * 4;
          if (d[i + 3] < 110) continue;
          const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          P.push({
            gx: x, gy: y, l, pl: Math.pow(l, 0.55) * 1.05, bt: (BY[(y % 4) * 4 + (x % 4)] + 0.5) / 16,
            c: `rgb(${(d[i] >> 5 << 5) + 16},${(d[i + 1] >> 5 << 5) + 16},${(d[i + 2] >> 5 << 5) + 16})`,
            x: 0, y: 0, vx: 0, vy: 0, ox: 0, oy: 0,
          });
        }
      size();
      P.forEach((p) => { p.x = calm ? p.ox : W / 2 + (Math.random() - 0.5) * W * 1.6; p.y = calm ? p.oy : H * 1.1 + Math.random() * H * 0.5; });
      setMode(0, false);
      raf = requestAnimationFrame(loop);
    };
    img.src = CFG.portrait;

    const mv = (e) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      el.style.setProperty('--x', `${mx}px`); el.style.setProperty('--y', `${my}px`);
    };
    const out = () => { mx = my = -999; el.style.setProperty('--x', '-300px'); el.style.setProperty('--y', '-300px'); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerdown', mv);
    ['pointerleave', 'pointerup', 'pointercancel'].forEach((t) => el.addEventListener(t, out));
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; });
    io.observe(el);
    addEventListener('resize', size);

    return () => {
      dead = true; cancelAnimationFrame(raf); io.disconnect();
      removeEventListener('resize', size);
      el.removeEventListener('pointermove', mv); el.removeEventListener('pointerdown', mv);
      ['pointerleave', 'pointerup', 'pointercancel'].forEach((t) => el.removeEventListener(t, out));
    };
  }, []);

  return (
    <figure className="port" ref={box} onClick={() => api.current.next && api.current.next()}
      data-tip="That is me. Move your mouse left and right to turn me, scroll to spin me, click to change the graphic.">
      <canvas ref={cv} aria-hidden="true" />
      <img src={CFG.portrait} alt={`${CFG.name} portrait`} />
      <span className="mn">render: {label}</span>
    </figure>
  );
}
