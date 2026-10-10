import { useEffect, useRef } from 'react';
import { CFG } from '../../utils/config.js';
import Portrait from '../portrait/Portrait.jsx';

// Sticky landing screen. Scroll adds 0-360°, mouse left/right adds ±45° of yaw.
export default function Landing() {
  const lw = useRef(null), ld = useRef(null), dg = useRef(null);
  const [first, ...rest] = CFG.name.split(' ');

  useEffect(() => {
    let sd = 0, yw = 0, tyw = 0, xt = 0, txt = 0, raf = 0;
    const onScroll = () => {
      const m = lw.current.offsetHeight - innerHeight;
      sd = (m > 0 ? Math.min(1, Math.max(0, scrollY / m)) : 0) * 360;
      dg.current.textContent = `${Math.round(sd)}°`;
    };
    const onMove = (e) => { tyw = (e.clientX / innerWidth - 0.5) * 90; txt = -(e.clientY / innerHeight - 0.5) * 18; };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      yw += (tyw - yw) * 0.07; xt += (txt - xt) * 0.07;
      ld.current.style.setProperty('--ha', `${(sd + yw).toFixed(1)}deg`);
      ld.current.style.setProperty('--hx', `${xt.toFixed(1)}deg`);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove); };
  }, []);

  return (
    <div className="lw" ref={lw}>
      <section className="land" ref={ld}>
        <Portrait />
        <h1 className="tt">{first}<br />{rest.join(' ')}</h1>
        <p className="sub">{CFG.tagline}</p>
        <span className="sc">move, scroll, click the photo · <b ref={dg}>0°</b></span>
        <a className="rbtn" href="#/resume" data-tip="Download my resume as a PDF.">Download resume ↓</a>
        <a className="cn c1" href="#/projects" data-tip="01 Projects. Five things I built, from healthcare AI to an invoice reader."><small>01</small>Projects</a>
        <a className="cn c2" href="#/experience" data-tip="02 Experience. Mastek, SuperStable, Commune and more."><small>02</small>Experience</a>
        <a className="cn c3" href="#/profile" data-tip="03 Profile. Gen AI, AI/ML, Full Stack and the skills behind them."><small>03</small>Profile</a>
        <a className="cn c4" href="#/contact" data-tip="04 Contact. Email, phone and a message form."><small>04</small>Contact</a>
      </section>
    </div>
  );
}
