import Scene from '../components/scene/Scene.jsx';

export default function StaticPage({ page, scene }) {
  return <Scene key={page} {...scene} />;
}
