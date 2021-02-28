import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { AmbientLight } from "three";
import { doGameOfLife, to3D, WorldSettings, WorldState } from "./helper";

export default class GameOfLife {
  renderer: THREE.WebGLRenderer;
  options: WorldSettings = {
    size: [10, 10, 10],
    cubeSize: [1, 1, 1],
    stepTime: 3000,
  };

  worldState: WorldState = {
    cubes: new Int8Array(
      this.options.size[0] * this.options.size[1] * this.options.size[2]
    ),
    time: 0,
  };
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  ref?: HTMLElement;

  constructor(ref?: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    if (ref) this.attach(ref);
    window.addEventListener("resize", () => {
      if (this.ref) this.attach(this.ref);
    });
    this.init();
  }

  private init() {
    // Seed the world state
    for (let i = 0; i < this.worldState.cubes.length; i++)
      this.worldState.cubes[i] = +(Math.random() < 0.2);

    // Edit Camera

    this.camera.position.set(0, 30, 30);
    this.camera.lookAt(0, 0, 0);

    // Create meshes
    for (let i = 0; i < this.worldState.cubes.length; i++) {
      const pos = to3D(i, this.options.size);
      const geometry = new THREE.BoxGeometry(...this.options.cubeSize);

      //   const geometry = new THREE.EdgesGeometry(
      //     new THREE.BoxGeometry(...this.options.cubeSize)
      //   );

      const material = new THREE.MeshNormalMaterial();

      const cube = new THREE.Mesh(
        geometry,
        material //new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      cube.position.set(
        pos[0] - this.options.size[0] / 2,
        pos[1] - this.options.size[1] / 2,
        pos[2] - this.options.size[2] / 2
      );
      cube.userData.i = i;
      cube.visible = !!this.worldState.cubes[i];

      this.scene.add(cube);
    }

    const light = new AmbientLight();
    const pointLight = new THREE.PointLight();
    pointLight.position.set(50, 50, 50);

    this.scene.add(pointLight);
    this.scene.add(light);
    this.tick();
  }

  public attach(ref: HTMLElement) {
    this.ref = ref;
    this.renderer.setSize(ref.clientWidth, ref.clientHeight);
    this.renderer.domElement.remove();
    ref.appendChild(this.renderer.domElement);

    // Update camera aspect ratio
    this.camera.aspect =
      this.renderer.domElement.clientWidth /
      this.renderer.domElement.clientHeight;
    this.camera.updateProjectionMatrix();
  }
  lastTime: number = 0;
  public tick(time = 0) {
    requestAnimationFrame(this.tick.bind(this));
    TWEEN.update(time);
    const delta = time - this.lastTime;
    this.lastTime = time;

    this.camera.position.set(
      Math.sin(time * 0.0005) * this.options.size[0] * 2,
      this.options.size[1],
      Math.cos(time * 0.0005) * this.options.size[2] * 2
    );
    this.camera.lookAt(0, 0, 0);
    this.worldState.time += delta;

    if (this.worldState.time <= this.options.stepTime) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    const newState = doGameOfLife(this.worldState.cubes, this.options.size);
    for (const c of this.scene.children) {
      if (c.userData.i === undefined) continue;
      const time = this.options.stepTime * 0.25;

      if (!!newState[c.userData.i] && !this.worldState.cubes[c.userData.i]) {
        // Now Alive
        const scale = { scale: 0 };
        new TWEEN.Tween(scale)
          .to({ scale: this.options.cubeSize[0] }, time)
          .easing(TWEEN.Easing.Circular.Out)
          .onStart(() => {
            c.visible = true;
            c.scale.set(0, 0, 0);
          })
          .onUpdate(() => {
            c.scale.set(scale.scale, scale.scale, scale.scale);
          })
          .onComplete(() => {
            c.visible = !!newState[c.userData.i];
          })
          .start();
      } else if (
        !newState[c.userData.i] &&
        !!this.worldState.cubes[c.userData.i]
      ) {
        // Now Dead
        const scale = { scale: 1 };
        new TWEEN.Tween(scale)
          .to({ scale: 0 }, time)
          .easing(TWEEN.Easing.Circular.Out)
          .onStart(() => {
            c.visible = true;
            c.scale.set(1, 1, 1);
          })
          .onUpdate(() => {
            c.scale.set(scale.scale, scale.scale, scale.scale);
          })
          .onComplete(() => {
            c.visible = false;
          })
          .start();
      }
    }
    this.worldState.cubes = newState;
    this.renderer.render(this.scene, this.camera);
    this.worldState.time = 0;
  }
}
