import React, { useEffect } from "react";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  MeshNormalMaterial,
  MeshBasicMaterial,
  SphereGeometry,
  OctahedronGeometry,
  LineSegments,
  LineBasicMaterial,
  Vector3,
  Geometry,
  Line,
  PlaneGeometry
} from "three";
import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

interface globeProps {
  className: string;
}

let scene: Scene;
let globe: OctahedronGeometry;
let mesh: Mesh;
let comp: HTMLDivElement | null;
let renderer: WebGLRenderer;
let camera: PerspectiveCamera;

const GlobeCanvas: React.FC<globeProps> = props => {
  useEffect(() => {
    renderGlobe();
  });

  return <div className={props.className} ref={e => (comp = e)}></div>;
};

function renderGlobe() {
  if (!comp) return;
  renderer = new WebGLRenderer({ preserveDrawingBuffer: true });
  renderer.autoClearColor = false;
  renderer.setSize(comp.clientWidth, comp.clientWidth);
  renderer.setPixelRatio(1);
  window.addEventListener("resize", resize);
  comp.appendChild(renderer.domElement);

  camera = new PerspectiveCamera(45, 1, 1, 500);
  camera.position.set(0, 0, 30);
  camera.lookAt(0, 0, 0);

  let fader = new PlaneGeometry(20, 20, 1, 1);

  var fadeMaterial = new MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.05
  });
  let faderMesh = new Mesh(fader, fadeMaterial);
  faderMesh.position.z = 20;

  scene = new Scene();
  globe = new OctahedronGeometry(8, 3);

  for (let vert of globe.vertices) {
    vert
      .normalize()
      .multiplyScalar(
        10 + 0.5 * simplex.noise3D(vert.x * 3, vert.y * 3, vert.z * 3)
      );
  }

  var material = new MeshNormalMaterial({ wireframe: true });
  mesh = new Mesh(globe, [material, new MeshBasicMaterial({ visible: false })]);

  scene.add(mesh);
  scene.add(faderMesh);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  if (!comp) return;
  renderer.setSize(comp.clientWidth, comp.clientWidth);
  renderer.render(scene, camera);
}

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  for (let vert of globe.vertices) {
    vert
      .normalize()
      .multiplyScalar(
        10 +
          0.4 * simplex.noise3D(vert.x * 3 + t, vert.y * 3 + t, vert.z * 3 + t)
      );
  }

  globe.rotateY(0.003);
  globe.rotateX(0.003);
  globe.rotateZ(0.003);

  globe.verticesNeedUpdate = true;
  globe.groupsNeedUpdate = true;
  renderer.render(scene, camera);
}

export default GlobeCanvas;
