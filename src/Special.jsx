import ContactForm from './components/contact/ContactForm.jsx';
import ContactLinks from './components/contact/ContactLinks.jsx';
import Download from './components/contact/Download.jsx';

const List = ({ Tag, items }) => <Tag>{items.map((x, i) => <li key={i} style={{ '--i': i }}>{x}</li>)}</Tag>;

export function Body({ e }) {
  if (e.kind === 'links') return <ContactLinks />;
  if (e.kind === 'form') return <ContactForm />;
  if (e.kind === 'download') return <Download />;
  return (
    <>
      {e.dm && <p className="dm">{e.dm}</p>}
      {e.p && <p>{e.p}</p>}
      {e.ul && <List Tag="ul" items={e.ul} />}
      {e.ol && <List Tag="ol" items={e.ol} />}
      {e.chips && <div className="chips">{e.chips.map((x) => <span key={x}>{x}</span>)}</div>}
    </>
  );
}
