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

/* FUNCIÓN PARA LIMPIAR EL FORMULARIO */
const resetForm = () => {
  animalId.value = "Seleccione un animal";
  edadId.value = "Seleccione un rango de años";
  comentariosId.value = "";
  previewId.removeAttribute("style");
};

/* FUNCIÓN ASYNC / AWAIT PARA EXTRAER DATA DEL ARCHIVO .JSON */
const getAnimalesJson = (async () => {
  try {
    const URL = "assets/animales.json";
    const request = await fetch(URL);
    const data = await request.json();
    return data;
    //console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

const getdata = (async () => {
  const data = await getAnimalesJson;
  const arrayAnimales = data.animales;
  const animalesInvestigacion = [];
  let animal = "";

  /* FUNCIÓN PARA ENCONTRAR COINCIDENCIA CON LA DATA DEL JSON */
  const funcionFind = () => {
    const animalFind = arrayAnimales.find(
      ({ name }) => name === animalId.value
    );
    return animalFind;
  };

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
      animalesInvestigacion.push(animal);
      console.log(animal);
      //console.log(animaleInvestigacion);
      crearCards();
      // modal(animal)

      resetForm();
    }
  });

  /* INSERTANDO IMAGEN EN EL BOARD DE ANIMALES EN INVEST. */
  const crearCards = () => {
    animalesId.innerHTML = "";

    animalesInvestigacion.forEach((animal) => {
      const DIVContainer = document.createElement("div");
      const IMGImagen = document.createElement("img");
      const DIVCardButton = document.createElement("div");

      DIVContainer.classList.add("card");

      IMGImagen.setAttribute("src", `/assets/imgs/${animal.img}`);
      IMGImagen.classList.add("img-small");

      DIVCardButton.classList.add("card-footer", "p-0");

      DIVCardButton.innerHTML = `
      <button class="btn btn-primary btn-block">
        <img src="/assets/imgs/audio.svg" style="width: 10px" />
      </button>
    `;

      IMGImagen.addEventListener("click", () => {
        console.log("click imagen => ", animal);
        $("#modal").modal("show");

        const modalBodyElement = document.querySelector("#modal .modal-body");

        modalBodyElement.innerHTML = `
        <img src="/assets/imgs/${animal.Img}" class="img-small"/>
        <ul class="text-white">
          <li>Nombre: ${animal.Nombre}</li>
          <li>Edad: ${animal.Edad}</li>
          <li>Comentarios: ${animal.Comentarios}</li>
        </ul>
      `;
      });

      DIVCardButton.addEventListener("click", () => {
        switch (animal.Nombre) {
          case "Leon":
            animal.Rugir();
            break;
          case "Lobo":
            animal.Aullar();
            break;
          case "Oso":
            animal.Gruñir();
            break;
          case "Serpiente":
            animal.Sisear();
            break;
          case "Aguila":
            animal.Chillar();
            break;
        }
      });

      DIVContainer.appendChild(IMGImagen);
      DIVContainer.appendChild(DIVCardButton);

      animalesId.appendChild(DIVContainer);
    });
  };
})();
