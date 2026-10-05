const directorios = {
  Veguitto: "Veguito",
  Veguito: "Veguito",
  Trunks: "Trunks",
  Gohan: "Gohan",
  Goku: "Goku",
  Veguetta: "Veguetta",
  Vegeta: "Veguetta",
  Cell: "Cell",
  Pikoro: "Pikoro",
  Piccolo: "Pikoro",
  Gogeta: "Gogueta",
  Gogueta: "Gogueta"
};

const formas = {
  cargar: "energia",
  basico: "basico",
  especial: "especial",
  semilla: "curar"
};

const tecnicas = {
  Veguitto: { basico: "Golpe de fusión", especial: "Final Kamehameha" },
  Veguito: { basico: "Golpe de fusión", especial: "Final Kamehameha" },
  Trunks: { basico: "Corte de espada", especial: "Burning Attack" },
  Gohan: { basico: "Golpe Saiyajin", especial: "Masenko" },
  Goku: { basico: "Combo Saiyajin", especial: "Kamehameha" },
  Veguetta: { basico: "Combo del príncipe", especial: "Final Flash" },
  Vegeta: { basico: "Combo del príncipe", especial: "Final Flash" },
  Cell: { basico: "Golpe regenerativo", especial: "Kamehameha perfecto" },
  Pikoro: { basico: "Golpe demoníaco", especial: "Makankosappo" },
  Piccolo: { basico: "Golpe demoníaco", especial: "Makankosappo" },
  Gogeta: { basico: "Combo de fusión", especial: "Big Bang Kamehameha" },
  Gogueta: { basico: "Combo de fusión", especial: "Big Bang Kamehameha" }
};

let temporizadorPopup;

function mostrarPopup(tipo, nombre, detalle, imagenSrc, imagenAlt) {
  const popup = document.getElementById("attack-popup");
  if (!popup) return;

  document.getElementById("attack-popup-type").textContent = tipo;
  const popupImage = document.getElementById("attack-popup-image");
  popupImage.src = imagenSrc;
  popupImage.alt = imagenAlt;
  document.getElementById("attack-popup-name").textContent = nombre;
  document.getElementById("attack-popup-detail").textContent = detalle;
  popup.classList.remove("is-visible");
  void popup.offsetWidth;
  popup.classList.add("is-visible");
  window.clearTimeout(temporizadorPopup);
  temporizadorPopup = window.setTimeout(() => popup.classList.remove("is-visible"), 1650);
}

document.addEventListener("click", (event) => {
  const retrato = event.target.closest("#py1 .fighter-roster img, #py2 .fighter-roster img");
  if (retrato) {
    const jugador = retrato.closest("#py1") ? "1" : "2";
    const nombres = tecnicas[retrato.alt];
    if (nombres) {
      document.getElementById(`p${jugador}-basico-label`).textContent = nombres.basico;
      document.getElementById(`p${jugador}-especial-label`).textContent = nombres.especial;
    }
    return;
  }

  const boton = event.target.closest("button[id]");
  const coincidencia = boton?.id.match(/^p([12])-(cargar|basico|especial|semilla)$/);
  if (!coincidencia) return;

  const [, jugador, accion] = coincidencia;
  const imagen = document.getElementById(`img_preview_p${jugador}`);
  const directorio = directorios[imagen?.alt];
  if (!imagen || !directorio) return;

  imagen.src = `./public/img/DB/${directorio}/${formas[accion]}.png`;
  const forma = document.getElementById(`form_p${jugador}`);
  if (forma) forma.textContent = accion === "especial" ? "FORMA DE ATAQUE" : accion === "basico" ? "FORMA DE COMBATE" : accion === "cargar" ? "KI CARGADO" : "RESTAURADO";
  imagen.classList.remove("power-up");
  void imagen.offsetWidth;
  imagen.classList.add("power-up");
  window.setTimeout(() => imagen.classList.remove("power-up"), 650);

  if (accion === "basico" || accion === "especial") {
    const tecnica = tecnicas[imagen.alt]?.[accion] || "Ataque";
    const dano = accion === "especial" ? 25 : 10;
    const estado = document.getElementById(`p${jugador}-estado`);
    mostrarPopup(accion === "especial" ? "TECNICA ESPECIAL" : "ATAQUE", tecnica.toUpperCase(), `${imagen.alt.toUpperCase()} / ${dano} DE DAÑO`, imagen.src, imagen.alt);
    if (tecnica && estado) {
      estado.textContent = `${imagen.alt} lanzó ${tecnica}: ${dano} de daño.`;
    }
  }
});