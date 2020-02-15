import React, { useEffect } from "react";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  MeshNormalMaterial,
  MeshBasicMaterial,
  OctahedronGeometry,
  PlaneGeometry
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

interface globeProps {
  className?: string;
}

let scene: Scene;
let globe: OctahedronGeometry;
let mesh: Mesh;
let comp: HTMLDivElement | null;
let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let controls: OrbitControls;

let ran = false;

const GlobeCanvas: React.FC<globeProps> = props => {
  useEffect(() => {
    renderGlobe();
  }, []);

  return <div className={props.className} ref={e => (comp = e)}></div>;
};

function renderGlobe() {
  if (!comp) return;
  renderer = new WebGLRenderer();
  // renderer.autoClearColor = false;
  renderer.setSize(comp.clientWidth, comp.clientWidth);
  renderer.setPixelRatio(1);
  window.addEventListener("resize", resize);
  comp.appendChild(renderer.domElement);

  camera = new PerspectiveCamera(45, 1, 1, 500);
  camera.position.set(0, 0, 30);
  camera.lookAt(0, 0, 0);

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
  mesh = new Mesh(globe, material);

  scene.add(mesh);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // controls.dampingFactor = 0.1;
  controls.enableKeys = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = 2 * Math.PI;

  controls.update();
  renderer.render(scene, camera);
  if (!ran) {
    requestAnimationFrame(animate);
    ran = true;
  }
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
  controls.update();
  globe.rotateY(0.003);
  globe.rotateX(0.003);
  globe.rotateZ(0.003);

  globe.verticesNeedUpdate = true;
  globe.groupsNeedUpdate = true;
  renderer.render(scene, camera);
}

export default GlobeCanvas;
