import { useEffect, useMemo, useRef, useState } from 'react';
import { PixelIcon } from './icons.jsx';
import { useGuide } from './Guide.jsx';
import { Body } from './Special.jsx';

// A sticky, full-screen scene. Scrolling rotates the centre object 360° and
// reveals the entries two at a time (left / right). One entry per step on phones.
export default function Scene({ kicker, title, sub, kind, entries, back = ['#/', '← Home'], prev, next }) {
  const wrap = useRef(null), stg = useRef(null), deg = useRef(null);
  const { say } = useGuide();
  const [cur, setCur] = useState(0);

  const steps = useMemo(() => {
    const per = innerWidth < 900 ? 1 : 2, out = [];
    for (let i = 0; i < entries.length; i += per) out.push(entries.slice(i, i + per));
    return out;
  }, [entries]);
  const titles = steps.map((es) => es.map((e) => e.h).join(' and '));
  const SN = steps.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const m = wrap.current.offsetHeight - innerHeight;
      const p = m > 0 ? Math.min(0.999, Math.max(0, scrollY / m)) : 0;
      stg.current.style.setProperty('--a', `${(p * 360).toFixed(1)}deg`);
      deg.current.textContent = `${Math.round(p * 360)}°`;
      setCur(Math.min(SN - 1, Math.floor(p * SN)));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [SN]);

  useEffect(() => { say(`${titles[cur]}.`); }, [cur]); // eslint-disable-line react-hooks/exhaustive-deps

  const tip = (j) => (j + 1 < SN ? `Next up: ${titles[j + 1]}. Keep scrolling.`
    : next ? `That was the last card. Next project: ${next.n}.` : 'That was the last card. Open another page from the menu.');

  return (
    <div className="scw" ref={wrap} style={{ height: `${SN * 90 + 100}vh` }}>
      <div className="stg" ref={stg}>
        <div className="shd"><i>{kicker}</i><h2>{title}</h2><p>{sub}</p></div>
        <a className="sbk" href={back[0]} data-tip="Take me back.">{back[1]}</a>
        <div className="sob">
          <div className="spin">
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((z) => (
              <PixelIcon key={z} kind={kind} size="100%" style={{ transform: `translateZ(${z * 7}px)`, opacity: z === 4 ? 1 : 0.55, filter: z === 4 ? 'none' : 'brightness(.65)' }} />
            ))}
          </div>
        </div>
        <span className="deg" ref={deg}>0°</span>
        <span className="dsc">scroll</span>
        <div className="sdots">{steps.map((_, j) => <i key={j} className={j <= cur ? 'on' : ''} />)}</div>
        <div className="steps">
          {steps.map((es, j) => (
            <div key={j} className={`step${j === cur ? ' on' : ''}`}>
              {es.map((e, n) => (
                <div key={e.h} className={`cd ${n ? 'r' : 'l'}`} data-tip={tip(j)}>
                  <div className="ch"><PixelIcon kind={e.ic} size={38} className="mi" /><h3>{e.h}</h3></div>
                  <Body e={e} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {prev && <a className="snl" href={`#/projects/${prev.id}`} data-tip={`Previous project: ${prev.n}.`}>‹ {prev.n}</a>}
        {next && <a className="snr" href={`#/projects/${next.id}`} data-tip={`Next project: ${next.n}.`}>{next.n} ›</a>}
      </div>
    </div>
  );
}
