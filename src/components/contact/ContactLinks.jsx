import { CFG, shortUrl, telHref } from '../../config.js';

export default function ContactLinks() {
  return (
    <ul>
      {CFG.email && <li style={{ '--i': 0 }}><a href={`mailto:${CFG.email}`}>{CFG.email}</a></li>}
      {CFG.phone && <li style={{ '--i': 1 }}><a href={telHref(CFG.phone)}>{CFG.phone}</a></li>}
      {CFG.linkedin && <li style={{ '--i': 2 }}><a href={CFG.linkedin} target="_blank" rel="noreferrer">{shortUrl(CFG.linkedin)}</a></li>}
      {CFG.github && <li style={{ '--i': 3 }}><a href={CFG.github} target="_blank" rel="noreferrer">{shortUrl(CFG.github)}</a></li>}
      {CFG.location && <li style={{ '--i': 4 }}>{CFG.location}</li>}
    </ul>
  );
}
