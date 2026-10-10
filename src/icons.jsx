import { useContext, useEffect, useRef } from 'react';
import { ThemeCtx } from './theme.jsx';

const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// Draws a small grayscale shape, then Bayer-dithers it in the accent colour.
export function makeIcon(kind, acc) {
  const o = document.createElement('canvas');
  o.width = o.height = 64;
  const g = o.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 64, 64);
  const gr = g.createRadialGradient(24, 20, 4, 32, 32, 44);
  gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#444');
  g.fillStyle = gr; g.strokeStyle = gr; g.lineWidth = 5;
  if (kind === 'wave') {
    [10, 22, 36, 48, 30, 18, 40, 26, 14].forEach((h, i) => g.fillRect(6 + i * 6, 32 - h / 2, 4, h));
  } else if (kind === 'person') {
    g.beginPath(); g.arc(32, 22, 11, 0, 7); g.fill();
    g.beginPath(); g.ellipse(32, 54, 22, 16, 0, Math.PI, 0); g.fill();
  } else if (kind === 'doc') {
    g.fillRect(14, 6, 34, 46);
    g.fillStyle = '#000'; [16, 24, 32, 40].forEach((y) => g.fillRect(19, y, 24, 3));
    g.fillStyle = gr; g.beginPath(); g.moveTo(40, 48); g.lineTo(60, 48); g.lineTo(52, 40); g.moveTo(60, 48); g.lineTo(52, 56); g.stroke();
  } else if (kind === 'search') {
    g.beginPath(); g.arc(26, 26, 16, 0, 7); g.stroke();
    g.lineWidth = 8; g.beginPath(); g.moveTo(38, 38); g.lineTo(56, 56); g.stroke();
  } else {
    g.fillRect(6, 8, 36, 24); g.fillRect(24, 30, 34, 24);
    g.fillStyle = '#000'; g.fillRect(12, 16, 20, 3); g.fillRect(30, 38, 22, 3);
  }
  const d = g.getImageData(0, 0, 64, 64).data;
  const v = document.createElement('canvas'); v.width = v.height = 64;
  const c = v.getContext('2d'); c.fillStyle = acc;
  for (let y = 0; y < 64; y++)
    for (let x = 0; x < 64; x++) {
      const l = d[(y * 64 + x) * 4] / 255;
      if (l > 0.04 && Math.pow(l, 0.8) > (B[(y % 4) * 4 + (x % 4)] + 0.5) / 16) c.fillRect(x, y, 1, 1);
    }
  return v;
}

export function PixelIcon({ kind, size, className, style }) {
  const ref = useRef(null);
  const { acc } = useContext(ThemeCtx);
  useEffect(() => {
    const c = ref.current.getContext('2d');
    c.clearRect(0, 0, 64, 64);
    c.drawImage(makeIcon(kind, acc), 0, 0);
  }, [kind, acc]);
  return <canvas ref={ref} width={64} height={64} className={className} aria-hidden="true" style={{ width: size, height: size, imageRendering: 'pixelated', ...style }} />;
}
