import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log("main.js loaded");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function getTorus(radius, color) {
  const geometry = new THREE.TorusGeometry(radius, 0.2, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: color,
  });
  const torus = new THREE.Mesh(geometry, material);
  return torus;
}


const torus1 = getTorus(8, 0x7FFF00);
const torus2 = getTorus(5, 0xDC143C);
scene.add(torus1, torus2);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./space.jpg');

scene.background = spaceTexture;


const rahulTexture = new THREE.TextureLoader().load('./rahul.gif');
const rahul = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: rahulTexture })
);
scene.add(rahul);

const earthTexture = new THREE.TextureLoader().load('./earth_daymap.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('./earth_normalmap.png');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 24, 24),
  new THREE.MeshBasicMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture
  })
);
earth.position.z = 30;
earth.position.setX(-10);
scene.add(earth);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  rahul.rotation.x = t * (-0.002);
  rahul.rotation.y = t * (-0.002);

  camera.position.z = 5 + t * (-0.01);
  camera.position.x = t * (-0.0002);
  camera.position.y = t * (-0.0002);
}


document.body.onscroll = moveCamera;
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  torus1.rotation.x += 0.02;
  torus1.rotation.y += 0.05;
  torus1.rotation.z += 0.005;

  torus2.rotation.x += 0.05;
  torus2.rotation.y += 0.05;
  torus2.rotation.z += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();