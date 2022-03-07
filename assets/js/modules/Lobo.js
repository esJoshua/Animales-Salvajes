import Animal from "./Animal.js";

export default class Lobo extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  aullar() {
    const audio = document.createElement("audio");
    audio.setAttribute("src", `${this._sonido}`);
    audio.play();
    //return "hola lobo";
  }
}
