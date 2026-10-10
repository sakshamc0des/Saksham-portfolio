import { useRef } from 'react';
import { PROJECTS } from '../../data/projects.js';
import { PixelIcon } from '../../icons.jsx';

// A pannable "world": drag, scroll or shift+scroll. Objects are laid out in a 3 + 2 grid.
export default function ProjectsPage() {
  const wr = useRef(null), st = useRef(null), drag = useRef(null), moved = useRef(0);

  const down = (e) => {
    if (innerWidth <= 720) return;
    drag.current = { x: e.clientX, y: e.clientY, l: wr.current.scrollLeft, t: wr.current.scrollTop };
    moved.current = 0;
    wr.current.classList.add('drag');
  };
  const move = (e) => {
    const r = st.current.getBoundingClientRect();
    st.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    st.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    moved.current = Math.max(moved.current, Math.abs(dx) + Math.abs(dy));
    wr.current.scrollLeft = d.l - dx; wr.current.scrollTop = d.t - dy;
  };
  const up = () => { drag.current = null; wr.current.classList.remove('drag'); };

  return (
    <section id="proj">
      <h2>Projects</h2>
      <p className="lead" style={{ marginTop: -8 }}>Drag, scroll or shift+scroll to explore. Click an object to open it.</p>
      <div className="pjwrap" ref={wr} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
        onClickCapture={(e) => { if (moved.current > 6) { e.preventDefault(); e.stopPropagation(); } }}>
        <div className="pjstage" ref={st}>
          {PROJECTS.map((q, i) => (
            <a key={q.id} className="pj" href={`#/projects/${q.id}`} draggable={false} data-tip={`${q.n}. ${q.s}`}
              style={{ left: `${q.x}%`, top: `${q.y}%`, '--d': 8 + i * 4, animationDelay: `-${i * 1.3}s` }}>
              <PixelIcon kind={q.ic} size={q.sz} />
              <span className="pl"><i>0{i + 1}</i><b>{q.n}</b><em>{q.t}</em></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
