import { campoRequerido, validarNumeros, validarURL, validarGeneral } from "./validaciones.js"
//traigo elemento del html

let campoCodigo = document.querySelector("#codigo")
let campoProducto = document.querySelector("#producto")
let campoDescripcion = document.querySelector("#descripcion")
let campoCantidad = document.querySelector("#cantidad")
let campoURL = document.querySelector("#url")
let formularioProducto = document.querySelector("#formProducto")

//asociar un evento a un elemento de html desde js
campoCodigo.addEventListener("blur", () => { campoRequerido(campoCodigo) })
campoProducto.addEventListener("blur", () => { campoRequerido(campoProducto) })
campoDescripcion.addEventListener("blur", () => { campoRequerido(campoDescripcion) })
campoCantidad.addEventListener("blur", () => { validarNumeros((campoCantidad)) })
campoURL.addEventListener("blur", () => { validarURL(campoURL) })
formularioProducto.addEventListener("submit", guardarProducto);

function guardarProducto(e) {
    //verificar que todos los datos sean validos
    e.preventDefault()
    if (validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)) {
        //crear producto
        crearProducto();
    }


}

function crearProducto() {
    //crear un producto
    console.log("aqui crear producto")
    // new
}
