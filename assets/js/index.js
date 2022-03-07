import Aguila from "./modules/Aguila.js";
import Leon from "./modules/Leon.js";
import Oso from "./modules/Oso.js";
import Lobo from "./modules/Lobo.js";
import Serpiente from "./modules/Serpiente.js";

const animalesId = document.getElementById("Animales");
const animalId = document.getElementById("animal");
const edadId = document.getElementById("edad");
const comentariosId = document.getElementById("comentarios");
const previewId = document.getElementById("preview");
const btnRegistrarId = document.getElementById("btnRegistrar");
const playerId = document.getElementById("player");
const exampleModalId = document.getElementById("exampleModal");
//const dataInvest = [];
let animal = [];
let arrayAnimales = "";

/* FUNCIÓN PARA LIMPIAR EL FORMULARIO */
const resetForm = () => {
  animalId.value = "Seleccione un animal";
  edadId.value = "Seleccione un rango de años";
  comentariosId.value = "";
  previewId.removeAttribute("style");
};
/* FUNCIÓN PARA ENCONTRAR COINCIDENCIA CON LA DATA DEL JSON */
const funcionFind = () => {
  const animalFind = arrayAnimales.find(({ name }) => name === animalId.value);
  return animalFind;
};

/* FUNCIÓN ASYNC / AWAIT PARA EXTRAER DATA DEL ARCHIVO .JSON */
const getAnimalesJson = (async () => {
  try {
    const URL = "assets/animales.json";
    const request = await fetch(URL);
    const data = await request.json();
    arrayAnimales = data.animales;
    //console.log(arrayAnimales);
  } catch (error) {
    console.error(error);
  }
})();

/* IMAGEN PREVIEW */
animalId.addEventListener("change", () => {
  //console.log(funcionFind());
  previewId.style.backgroundImage =
    "url(assets/imgs/" + funcionFind().imagen + ")";
});

/* REGISTRAR INFO AL DAR CLICK AL BOTON */
btnRegistrarId.addEventListener("click", () => {
  //console.log(animalId.value)
  //console.log(!comentariosId.value.trim())

  /* VALIDACIONES DEL FORMULARIO */
  if (
    animalId.value == "Seleccione un animal" ||
    edadId.value == "Seleccione un rango de años" ||
    !comentariosId.value.trim()
  )
    return alert("Debe completar todos los campos del formulario");
  else {
    const datosInstanciacion = [
      funcionFind().name,
      edadId.value,
      funcionFind().imagen,
      comentariosId.value,
      funcionFind().sonido,
    ];
    /* INSTANCIACIONES */
    switch (animalId.value) {
      case "Leon":
        animal = new Leon(...datosInstanciacion);
        break;
      case "Lobo":
        animal = new Lobo(...datosInstanciacion);
        break;
      case "Oso":
        animal = new Oso(...datosInstanciacion);
        break;
      case "Serpiente":
        animal = new Serpiente(...datosInstanciacion);
        break;
      case "Aguila":
        animal = new Aguila(...datosInstanciacion);
        break;
      default:
        break;
    }
    // dataInvest.push(animal);
    //console.log(dataInvest);
    //console.log(animal);
    cardsBoard.cards(animal);
    resetForm();
  }
});

/* INSERTANDO IMAGEN EN EL BOARD DE ANIMALES EN INVEST. */
let cardsBoard = (() => {
  let crearCards = (animal) => {
    console.log(animal);

    animalesId.innerHTML += `        
        <div class="card col-12 col-md-3 p-0 m-1">
            <img class="card-img-top" src="assets/imgs/${funcionFind().imagen}" 
            height="250px" width="180px" alt="animalId.value">
            <div class="card-footer p-0 w-100">
                <button id="btnSonido" class="btn btn-secondary btn-block w-100">
                    <img src="assets/imgs/audio.svg" style="width: 30px" />
                </button>
            </div>
        </div>        
        `;
  };
  return { cards: (animal) => crearCards(animal) };
})();
