function campoRequerido(input) {
    if (input.value.trim( ).length > 0) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

//funcion especifica para validar numeros

function validarNumeros(input){
    //crear expresion regular
    let patron = /^[0-9]{1,3}$/;
    //el metodo test devulve true, false
    if(patron.test(input.value)){
        //cumple expresion regular
        input.className = "form-control is-valid";
        return true;
    }else{
        //no cumple
        input.className = "form-control is-invalid";
        return false;
    }
}

function validarURL(input){
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
    if(patron.test(input.value)){
        input.className = "form-control is-valid";
        return true;
    }else{
        //no cumple
        input.className = "form-control is-invalid";
        return false;
    }
}

function validarGeneral(e){
    //prevenir actualizar del submit
    e.preventDefault();
    console.log("desde validar gral")
    let alerta = document.querySelector("#msjAlerta");
    if(campoRequerido(campoCodigo) &&
     campoRequerido(campoProducto) &&
     campoRequerido(campoDescripcion) &&
      validarNumeros(campoCantidad) &&
       validarURL(campoURL)){
        console.log("datos listos")
        alerta.className = "alert alert-danger my-5 d-none";
    }else{
        console.log("datos mal")
        alerta.className = "alert alert-danger my-5";
    }
}

//traigo elemento del html

let campoCodigo = document.querySelector("#codigo")
let campoProducto = document.querySelector("#producto")
let campoDescripcion = document.querySelector("#descripcion")
let campoCantidad = document.querySelector("#cantidad")
let campoURL = document.querySelector("#url")
let formularioProducto = document.querySelector("#formProducto")

//asociar un evento a un elemento de html desde js

campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)})
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)})
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)})
campoCantidad.addEventListener("blur", ()=>{validarNumeros((campoCantidad))})
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)})
formularioProducto.addEventListener("submit", validarGeneral);
