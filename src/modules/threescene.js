import * as THREE from "three";

/* =========================================================
   ESCENA THREE.JS DEL HERO
========================================================= */

export function initThreeScene() {
  const canvas = document.querySelector("#heroCanvas");

  if (!canvas) return;

  /* -----------------------------------------------------
       ESCENA
    ----------------------------------------------------- */

  const scene = new THREE.Scene();

  /* -----------------------------------------------------
       CÁMARA

       PerspectiveCamera:
       45 = campo visual.
       0.1 / 100 = distancia mínima y máxima renderizada.
    ----------------------------------------------------- */

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  camera.position.z = 6;

  /* -----------------------------------------------------
       RENDERER

       alpha:true permite fondo transparente.
       antialias suaviza los bordes.
    ----------------------------------------------------- */

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setSize(window.innerWidth, window.innerHeight);

  /* -----------------------------------------------------
       GRUPO PRINCIPAL

       Todo el objeto se guarda dentro de un grupo para
       poder rotarlo fácilmente.
    ----------------------------------------------------- */

  const group = new THREE.Group();

  scene.add(group);

  /* -----------------------------------------------------
       NÚCLEO GEOMÉTRICO

       TorusKnot crea una forma compleja que funciona muy
       bien para una estética tecnológica.
    ----------------------------------------------------- */

  const geometry = new THREE.TorusKnotGeometry(1.15, 0.23, 180, 28);

  const material = new THREE.MeshStandardMaterial({
    color: 0x161616,
    metalness: 0.95,
    roughness: 0.2,
  });

  const core = new THREE.Mesh(geometry, material);

  group.add(core);

  /* -----------------------------------------------------
       ANILLO ROJO

       Representa visualmente al sol japonés.
    ----------------------------------------------------- */

  const ringGeometry = new THREE.TorusGeometry(1.85, 0.018, 16, 150);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2020,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  ring.rotation.x = Math.PI / 2.7;

  group.add(ring);

  /* -----------------------------------------------------
       SEGUNDO ANILLO
    ----------------------------------------------------- */

  const ring2 = ring.clone();

  ring2.scale.setScalar(0.8);

  ring2.rotation.set(Math.PI / 2, Math.PI / 4, 0);

  group.add(ring2);

  /* -----------------------------------------------------
       ILUMINACIÓN
    ----------------------------------------------------- */

  const redLight = new THREE.PointLight(0xff2020, 18, 8);

  redLight.position.set(2, 2, 3);

  scene.add(redLight);

  const whiteLight = new THREE.DirectionalLight(0xffffff, 2);

  whiteLight.position.set(-3, 2, 4);

  scene.add(whiteLight);

  /* -----------------------------------------------------
       PARTÍCULAS

       Creamos pequeños puntos flotando alrededor del objeto.
    ----------------------------------------------------- */

  const particleCount = 700;

  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x777777,

    size: 0.012,

    transparent: true,

    opacity: 0.65,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);

  scene.add(particles);

  /* -----------------------------------------------------
       MOVIMIENTO DEL MOUSE

       Guardamos coordenadas entre -0.5 y 0.5.
    ----------------------------------------------------- */

  const mouse = {
    x: 0,
    y: 0,
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX / window.innerWidth - 0.5;

    mouse.y = event.clientY / window.innerHeight - 0.5;
  });

  /* -----------------------------------------------------
       SCROLL

       Usaremos el scroll para modificar lentamente la
       rotación del objeto.
    ----------------------------------------------------- */

  let scrollY = 0;

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  /* -----------------------------------------------------
       LOOP DE ANIMACIÓN

       Se ejecuta aproximadamente 60 veces por segundo.
    ----------------------------------------------------- */

  function animate() {
    requestAnimationFrame(animate);

    /* Rotación constante muy lenta */

    group.rotation.y += 0.002;

    group.rotation.x += 0.0007;

    /* Reacción al mouse */

    group.rotation.y += (mouse.x * 0.4 - group.rotation.y) * 0.015;

    group.position.y += (-mouse.y * 0.35 - group.position.y) * 0.03;

    /* Influencia ligera del scroll */

    ring.rotation.z = scrollY * 0.0004;

    particles.rotation.y += 0.0001;

    renderer.render(scene, camera);
  }

  animate();

  /* -----------------------------------------------------
       RESPONSIVE

       Ajustamos cámara y canvas al cambiar tamaño de ventana.
    ----------------------------------------------------- */

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
