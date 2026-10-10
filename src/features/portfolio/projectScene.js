import { PROJECTS } from '../../data/projects.js';

const KIND = ['wave', 'doc', 'search', 'person', 'chat'];

export function buildProjectScene(index) {
  const project = PROJECTS[index];
  const total = PROJECTS.length;

  return {
    kicker: `0${index + 1} / 0${total}`,
    title: project.n,
    sub: project.t,
    kind: project.ic,
    back: ['#/projects', '← All projects'],
    prev: PROJECTS[(index + total - 1) % total],
    next: PROJECTS[(index + 1) % total],
    entries: [
      ...Object.entries(project.c).map(([heading, content], entryIndex) => ({
        h: heading,
        ic: KIND[entryIndex % KIND.length],
        [/^How/.test(heading) ? 'ol' : 'ul']: content,
      })),
      { h: 'Stack', ic: 'search', chips: project.k },
    ],
  };
}
