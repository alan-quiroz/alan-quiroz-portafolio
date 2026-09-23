/* =========================================================
   ESTILOS
========================================================= */

import "./style.css";

/* =========================================================
   LIBRERÍAS
========================================================= */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* =========================================================
   MÓDULOS PROPIOS
========================================================= */

import { projects } from "./data/projects.js";
import { initTerminal } from "./modules/terminal.js";
import { initThreeScene } from "./modules/threescene.js";

/* =========================================================
   GSAP
========================================================= */

/* Activamos ScrollTrigger para poder animar elementos
   según la posición del scroll. */
gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SMOOTH SCROLL CON LENIS
========================================================= */

const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
});

/* Cada vez que Lenis mueve la página actualizamos
   ScrollTrigger para mantener las animaciones sincronizadas. */
lenis.on("scroll", ScrollTrigger.update);

/* GSAP controla el ciclo de actualización de Lenis. */
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* =========================================================
   PRELOADER
========================================================= */

const loader = document.querySelector("#loader");
const number = document.querySelector("#loaderNumber");
const progress = document.querySelector("#loaderProgress");

let percentage = {
  value: 0,
};

/* Animamos un valor interno desde 0 hasta 100. */
gsap.to(percentage, {
  value: 100,

  duration: 2,

  ease: "power3.inOut",

  onUpdate() {
    const value = Math.round(percentage.value);

    number.textContent = value.toString().padStart(2, "0");

    progress.style.width = `${value}%`;
  },

  onComplete() {
    openWebsite();
  },
});

/* Retira el loader y muestra el HERO. */
function openWebsite() {
  const timeline = gsap.timeline();

  timeline

    .to(loader, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    })

    .from(
      ".hero-line",
      {
        y: 180,
        opacity: 0,
        stagger: 0.12,
        duration: 1.3,
        ease: "power4.out",
      },
      "-=.5",
    )

    .from(
      ".hero__description",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
      },
      "-=.8",
    );
}

/* =========================================================
   CURSOR PERSONALIZADO
========================================================= */

const cursor = document.querySelector(".cursor");

/* Seguimiento del mouse. */
window.addEventListener("mousemove", (event) => {
  gsap.to(cursor, {
    x: event.clientX,
    y: event.clientY,

    duration: 0.18,

    ease: "power3.out",
  });
});

/* Agrandamos el cursor cuando pasa sobre elementos
   interactivos. */
document.querySelectorAll("a, button, .skill-row").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("is-active");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-active");
  });
});

/* =========================================================
   MENÚ MÓVIL
========================================================= */

const menuButton = document.querySelector("#menuToggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("is-open");

  const isOpen = nav.classList.contains("is-open");

  menuButton.setAttribute("aria-expanded", isOpen);
});

/* Cerramos el menú al seleccionar una sección. */
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
});

/* =========================================================
   ANIMACIONES DE APARICIÓN
========================================================= */

gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.from(element, {
    y: 80,

    opacity: 0,

    duration: 1,

    ease: "power3.out",

    scrollTrigger: {
      trigger: element,

      start: "top 85%",
    },
  });
});

/* =========================================================
   HERO + SCROLL
========================================================= */

/* El nombre principal desaparece lentamente
   mientras bajamos por la página. */
gsap.to(".hero__title", {
  yPercent: -25,

  opacity: 0.15,

  ease: "none",

  scrollTrigger: {
    trigger: ".hero",

    start: "top top",

    end: "bottom top",

    scrub: true,
  },
});

/* Movimiento del texto japonés vertical. */
gsap.to(".hero__japanese", {
  yPercent: -100,

  ease: "none",

  scrollTrigger: {
    trigger: ".hero",

    scrub: true,
  },
});

/* =========================================================
   SKILLS
========================================================= */

const skills = gsap.utils.toArray(".skill-row");

skills.forEach((skill, index) => {
  gsap.from(skill, {
    /* Alternamos la dirección de entrada. */
    x: index % 2 ? 50 : -50,

    opacity: 0,

    duration: 0.8,

    scrollTrigger: {
      trigger: skill,

      start: "top 92%",
    },
  });
});

/* =========================================================
   STATEMENT
========================================================= */

gsap.from(".statement h2", {
  scale: 0.82,

  opacity: 0.15,

  scrollTrigger: {
    trigger: ".statement",

    start: "top bottom",

    end: "center center",

    scrub: 1,
  },
});

/* =========================================================
   GENERADOR DE PROYECTOS
========================================================= */

const projectContainer = document.querySelector("#projectContainer");

projects.forEach((project) => {
  /* Convertimos el array de tecnologías
       en etiquetas HTML. */
  const tags = project.technologies
    .map((technology) => {
      return `<span>${technology}</span>`;
    })
    .join("");

  /* Generamos automáticamente una tarjeta
       por cada proyecto de projects.js. */
  projectContainer.insertAdjacentHTML(
    "beforeend",

    `
        <article class="swiper-slide project-card">

            <div class="project-card__background"></div>

            <span class="project-card__number">
                ${project.number}
            </span>

            <div class="project-card__content">

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-tags">
                    ${tags}
                </div>

                <a
                    href="${project.url}"
                    class="project-link"
                >
                    VIEW PROJECT
                    <span>↗</span>
                </a>

            </div>

        </article>
        `,
  );
});

/* =========================================================
   SWIPER
========================================================= */

new Swiper(".project-slider", {
  modules: [Navigation, Pagination],

  slidesPerView: 1.1,

  spaceBetween: 25,

  speed: 900,

  grabCursor: true,

  navigation: {
    nextEl: ".project-next",

    prevEl: ".project-prev",
  },

  pagination: {
    el: ".swiper-pagination",

    type: "fraction",
  },

  breakpoints: {
    900: {
      slidesPerView: 1.35,

      spaceBetween: 35,
    },
  },
});

/* =========================================================
   PARALLAX PARA PROYECTOS
========================================================= */

document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 12;

  const y = (event.clientY / window.innerHeight - 0.5) * 12;

  gsap.to(".project-card__background", {
    x,

    y,

    duration: 1.2,

    ease: "power3.out",
  });
});

/* =========================================================
   THREE.JS
========================================================= */

initThreeScene();

/* =========================================================
   TERMINAL
========================================================= */

initTerminal();

/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

document.querySelector("#year").textContent = new Date().getFullYear();
