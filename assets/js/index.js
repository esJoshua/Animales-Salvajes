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
const datosInvest = [];
//let i = 0;
/* FUNCIÓN PARA LIMPIAR EL FORMULARIO */
const resetForm = () => {
  animalId.value = "Seleccione un animal";
  edadId.value = "Seleccione un rango de años";
  comentariosId.value = "";
  previewId.removeAttribute("style");
};

/* FUNCIÓN ASYNC / AWAIT PARA ARCHIVO .JSON */
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
      let animal = "";
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
      console.log(animal);
      //console.log(comentariosId.value);
      datosInvest.push(animal);
      crearCards(animal);
      resetForm();
    }
  });

  /* INSERTANDO IMAGEN EN EL BOARD DE ANIMALES EN INVEST. */
  const crearCards = (a) => {
    console.log(datosInvest);
    //console.log(datosInvest[datosInvest.length - 1]);
    animalesId.innerHTML += `        
      <div class="card col-12 col-md-3 p-0 m-1">
      <img id="btnImg" class="card-img-top" src="assets/imgs/${a.img}" 
      height="250px" width="180px" alt="${a.nombre}">
      <div class="card-footer p-0 w-100">
      <button id="btnSonido" class="btn btn-secondary btn-block w-100">
      <img src="assets/imgs/audio.svg" style="width: 30px" />
      </button>
      </div>
      </div>        
      `;
    //i++;
    //console.log(i);
    const btnImgId = document.getElementById("btnImg");
    const btnSonidoId = document.getElementById("btnSonido");

    /*  EVENTO addEventListener PARA REPRODUCIR SONIDO DEL ANIMAL con fallas */
    btnSonidoId.addEventListener("click", () => {
      const repro = () => {
        playerId.setAttribute("src", `/assets/sounds/${a.sonido}`);
        playerId.play();
      };
      console.log("click btn sonido");
      console.log(a.nombre);
      switch (a.nombre) {
        case "Leon":
          a.rugir(repro());
          break;
        case "Lobo":
          a.aullar(repro());
          break;
        case "Oso":
          a.gruñir(repro());
          break;
        case "Serpiente":
          a.sisear(repro());
          break;
        case "Aguila":
          a.chillar(repro());
          break;
      }
    });

    /*  EVENTO addEventListener PARA TARJETA MODAL DEL ANIMAL No Funcional aún*/
    btnImgId.addEventListener("click", () => {
      console.log("click btn imagen");
      exampleModalId.innerHTML = `
              <div class="modal-dialog modal-dialog-centered w-25" role="document">
                <div class="modal-content bg-dark">
                  <div class="modal-body">
                    <img src="/assets/imgs/${a.img}"class="mx-auto d-block card-display"/>
                    <ul class="text-white list-unstyled">
                      <li>Nombre: ${a.nombre}</li>
                      <li>Edad: ${a.edad}</li>
                      <li>Comentarios:${a.comentarios} </li>
                    </ul>
                  </div>
                </div>
              </div>`;
    });
  };
})();
