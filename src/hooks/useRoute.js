import { useEffect, useState } from 'react';

export function useRoute() {
  const read = () => location.hash.replace(/^#\/?/, '').split('/');
  const [segments, setSegments] = useState(read);

  useEffect(() => {
    const handleHashChange = () => setSegments(read());
    addEventListener('hashchange', handleHashChange);
    return () => removeEventListener('hashchange', handleHashChange);
  }, []);

  return {
    page: segments[0] || 'home',
    sub: segments[1],
  };
}
