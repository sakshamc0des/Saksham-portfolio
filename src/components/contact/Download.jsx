import { CFG } from '../../config.js';
import { useGuide } from '../../Guide.jsx';

export default function Download() {
  const { say } = useGuide();

  return (
    <>
      <p className="dm">PDF</p>
      <p>My latest resume: the Mastek internship, five projects, skills and education.</p>
      <div className="row">
        <a
          className="btn"
          href={CFG.resume}
          download={`${CFG.name.replace(/\s+/g, '_')}_Resume.pdf`}
          onClick={() => say('Resume on its way. Good luck out there!')}
        >
          Download PDF
        </a>
      </div>
    </>
  );
}
