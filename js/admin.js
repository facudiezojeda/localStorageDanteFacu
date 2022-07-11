import { campoRequerido, validarNumeros, validarURL, validarGeneral } from "./validaciones.js";
import {Producto} from "./productoClass.js";
//traigo elemento del html

let campoCodigo = document.querySelector("#codigo")
let campoProducto = document.querySelector("#producto") 
let campoDescripcion = document.querySelector("#descripcion")
let campoCantidad = document.querySelector("#cantidad")
let campoURL = document.querySelector("#url")
let formularioProducto = document.querySelector("#formProducto")
// si hay algo en ls quiero guardarlo en arreglo, sino que sea un arreglo vacio
let listaProductos = JSON.parse(localStorage.getItem("arregloProductosKey")) || [];

//asociar un evento a un elemento de html desde js
campoCodigo.addEventListener("blur", () => { campoRequerido(campoCodigo) })
campoProducto.addEventListener("blur", () => { campoRequerido(campoProducto) })
campoDescripcion.addEventListener("blur", () => { campoRequerido(campoDescripcion) })
campoCantidad.addEventListener("blur", () => { validarNumeros((campoCantidad)) })
campoURL.addEventListener("blur", () => { validarURL(campoURL) })
formularioProducto.addEventListener("submit", guardarProducto);

//llamo a carga inicial
 cargaInicial();

function guardarProducto(e) {
    //verificar que todos los datos sean validos
    e.preventDefault()
    if (validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)) {
        //crear producto
        crearProducto();
    }

}

function crearProducto() {
    //crear un objeto producto  

    let productoNuevo = new Producto(campoCantidad.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoURL.value);
    //guardar objeto dentro del arreglo del producto
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    //limpiar formulario
    limpiarFormulario();
    // guardar arreglo de productos dentro de local storage
    guardarLocalStorage();
    //mostrar producto creado al usuario
    Swal.fire(
        'Bien hecho!',
        'Se creo el producto correctamente!',
        'success'
      )
    // cargar producto en la tabla maquetada
    crearFila(productoNuevo);
}

function limpiarFormulario(){
    // limpiamos value de formulario
    formularioProducto.reset()
    // resetear clase
    campoCodigo.className = "form-control";
    campoProducto.className = "form-control";
    campoDescripcion.className = "form-control";
    campoCantidad.className = "form-control";
    campoURL .className = "form-control";
}

function guardarLocalStorage(){
    localStorage.setItem("arregloProductosKey", JSON.stringify(listaProductos) )
}

function crearFila(producto){
    let tablaProductos = document.querySelector("#tablaProductos");
    tablaProductos.innerHTML += `<tr>
    <th scope="row">${producto.codigo}</th>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
        <button class="btn btn-warning">Editar</button>
        <button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`
}

function cargaInicial(){
    if(listaProductos.length > 0)
    //crear filas
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)}); 
}