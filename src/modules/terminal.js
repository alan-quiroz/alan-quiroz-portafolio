/* =========================================================
   TERMINAL INTERACTIVA

   Recibe comandos escritos por el visitante y devuelve
   información del portfolio.
========================================================= */

export function initTerminal() {
  const form = document.querySelector("#terminalForm");
  const input = document.querySelector("#terminalInput");
  const output = document.querySelector("#terminalOutput");

  if (!form || !input || !output) return;

  /* -----------------------------------------------------
       Comandos disponibles.

       Podemos agregar todos los que queramos después.
    ----------------------------------------------------- */

  const commands = {
    help: `
Comandos disponibles:<br>
<strong>about</strong> · Información sobre mí<br>
<strong>skills</strong> · Tecnologías<br>
<strong>projects</strong> · Proyectos<br>
<strong>contact</strong> · Contacto<br>
<strong>whoami</strong> · Usuario actual<br>
<strong>location</strong> · Ubicación<br>
<strong>clear</strong> · Limpiar terminal
        `,

    about: `
Alan Quiroz · Estudiante de Analista de Sistemas.<br>
Desarrollo software y experiencias digitales interactivas.
        `,

    skills: `
HTML · CSS · JavaScript · PHP · MySQL · Java · Git · Three.js · GSAP
        `,

    projects: `
01 · ALUSTOCK<br>
02 · PERSONAL PORTFOLIO<br>
03 · MORE COMING SOON
        `,

    contact: `
Email: alanquiroz969@gmail.com
        `,

    whoami: `
alan
        `,

    location: `
Villa Constitución · Santa Fe · Argentina
        `,
  };

  /* Agrega una nueva línea visual a la terminal. */

  function printLine(content, className = "") {
    const line = document.createElement("div");

    line.className = `terminal-line ${className}`;

    line.innerHTML = content;

    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
  }

  /* Ejecuta el comando ingresado. */

  function executeCommand(command) {
    const value = command.trim().toLowerCase();

    if (!value) return;

    printLine(`alan@portfolio:~$ ${value}`, "command");

    /* clear se maneja por separado porque elimina contenido. */

    if (value === "clear") {
      output.innerHTML = "";

      return;
    }

    /* Si existe el comando, mostramos su respuesta. */

    if (commands[value]) {
      printLine(commands[value]);

      return;
    }

    /* Respuesta para comandos inexistentes. */

    printLine(
      `command not found: ${value}<br>Usá <strong>help</strong> para ver los comandos.`,
      "terminal-muted",
    );
  }

  /* Capturamos el envío del formulario. */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    executeCommand(input.value);

    input.value = "";
  });

  /* Al hacer click dentro de la terminal llevamos el foco al input. */

  document
    .querySelector(".terminal")
    ?.addEventListener("click", () => input.focus());
}
