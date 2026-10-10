import Scene from '../components/scene/Scene.jsx';

export default function ProjectDetailPage({ scene, sub }) {
  return <Scene key={sub} {...scene} />;
}
