import { useState } from 'react';
import { CFG } from '../../config.js';
import { useGuide } from '../../Guide.jsx';

export default function ContactForm() {
  const { say } = useGuide();
  const [f, setF] = useState({ name: '', email: '', msg: '' });

  const set = (key) => (event) => {
    setF((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const send = () => {
    if (!f.msg.trim()) {
      say('Hmm, the message is empty. Write something first.', 'worry');
      return;
    }

    const body = `${f.msg}\n\n${f.name}${f.email ? ` (${f.email})` : ''}`;
    window.location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(`Hello from ${f.name || 'your portfolio'}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <label htmlFor="cn">Your name</label>
      <input id="cn" autoComplete="name" value={f.name} onChange={set('name')} />
      <label htmlFor="ce">Your email</label>
      <input id="ce" type="email" autoComplete="email" value={f.email} onChange={set('email')} />
      <label htmlFor="cm">Message</label>
      <textarea id="cm" rows="4" value={f.msg} onChange={set('msg')} />
      <div className="row"><button type="button" className="btn" onClick={send}>Open in my mail app</button></div>
    </>
  );
}
