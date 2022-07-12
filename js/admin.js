import { campoRequerido, validarNumeros, validarURL, validarGeneral } from "./validaciones.js";
import { Producto } from "./productoClass.js";
//traigo elemento del html

let campoCodigo = document.querySelector("#codigo")
let campoProducto = document.querySelector("#producto")
let campoDescripcion = document.querySelector("#descripcion")
let campoCantidad = document.querySelector("#cantidad")
let campoURL = document.querySelector("#url")
let formularioProducto = document.querySelector("#formProducto")
// si hay algo en ls quiero guardarlo en arreglo, sino que sea un arreglo vacio
let listaProductos = JSON.parse(localStorage.getItem("arregloProductosKey")) || [];
let productoExistente = false; //si productoExistente es false quiero crear.. true modificar
let btnNuevo = document.querySelector("#btnNuevo");

//asociar un evento a un elemento de html desde js
campoCodigo.addEventListener("blur", () => { campoRequerido(campoCodigo) })
campoProducto.addEventListener("blur", () => { campoRequerido(campoProducto) })
campoDescripcion.addEventListener("blur", () => { campoRequerido(campoDescripcion) })
campoCantidad.addEventListener("blur", () => { validarNumeros((campoCantidad)) })
campoURL.addEventListener("blur", () => { validarURL(campoURL) })
formularioProducto.addEventListener("submit", guardarProducto);
btnNuevo.addEventListener("click", limpiarFormulario);

//llamo a carga ini cial
cargaInicial();

function guardarProducto(e) {
    //verificar que todos los datos sean validos
    e.preventDefault()
    if (validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)) {
        if (productoExistente == false) {
            //crear producto
            crearProducto();
        } else {
            //modificar producto
            modificarProducto();
        }
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

function limpiarFormulario() {
    // limpiamos value de formulario
    formularioProducto.reset()
    // resetear clase
    campoCodigo.className = "form-control";
    campoProducto.className = "form-control";
    campoDescripcion.className = "form-control";
    campoCantidad.className = "form-control";
    campoURL.className = "form-control";
    //resetear variable booleana
    productoExistente = false;
}

function guardarLocalStorage() {
    localStorage.setItem("arregloProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
    let tablaProductos = document.querySelector("#tablaProductos");
    tablaProductos.innerHTML += `<tr>
    <th scope="row">${producto.codigo}</th>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
        <button class="btn btn-warning" onclick='prepararEdicionProductos("${producto.codigo}")'>Editar</button>
        <button class="btn btn-danger" onclick='borrarProducto("${producto.codigo}")'>Borrar</button>
    </td>
  </tr>`
}

function cargaInicial() {
    if (listaProductos.length > 0)
        //crear filas
        listaProductos.forEach((itemProducto) => { crearFila(itemProducto) });
}

window.prepararEdicionProductos = (codigo) => {

    //buscar producto en el arreglo
    let productoBuscado = listaProductos.find((itemProducto) => { return itemProducto.codigo == codigo })
    console.log(productoBuscado)
    //mostrar producto en el formulario
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    campoURL.value = productoBuscado.url;
    // cambio variable productoExistente
    productoExistente = true;


}

function modificarProducto(){
      //encontrar posicion de elemento que quiero modificar
      let posicionObjetoBuscado = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value})

      //modificar los valores dentro del arreglo
      listaProductos[posicionObjetoBuscado].producto = campoProducto.value;
      listaProductos[posicionObjetoBuscado].descripcion = campoDescripcion.value;
      listaProductos[posicionObjetoBuscado].cantidad = campoCantidad.value; 
      listaProductos[posicionObjetoBuscado].url = campoURL.value;    
      //actualizar localStorage
      guardarLocalStorage();  
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      Swal.fire(
        'Bien hecho!',
        'Se modifico el producto correctamente!',
        'success'
    )
      limpiarFormulario();
}
  

function borrarTabla(){
  let tbodyProductos = document.querySelector("#tablaProductos");
  tbodyProductos.innerHTML="";
} 

window.borrarProducto = function (codigo){
    // buscar posicion del elemento en el areglo y borrarlo
    let arregloNuevo = listaProductos.filter((item)=>{return item.codigo != codigo});
    //actualizo arreglo origial y el localstorage
    listaProductos = arregloNuevo;
    guardarLocalStorage();
    // actualizar tabla
    borrarTabla();
    cargaInicial();
    //mostrar cartel usuario
    Swal.fire(
        'Producto eliminado!',
        'Se elimino el producto correctamente!',
        'success'
    )

}
