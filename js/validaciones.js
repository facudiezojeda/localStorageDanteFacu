export function campoRequerido(input) {
    if (input.value.trim( ).length > 0) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

//funcion especifica para validar numeros

export function validarNumeros(input){
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

export function validarURL(input){
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

export function validarGeneral(campoCodigo,campoProducto, campoDescripcion, campoCantidad, campoURL){
    //prevenir actualizar del submit
    let alerta = document.querySelector("#msjAlerta");
    if(campoRequerido(campoCodigo) &&
     campoRequerido(campoProducto) &&
     campoRequerido(campoDescripcion) && 
      validarNumeros(campoCantidad) &&
       validarURL(campoURL)){
        console.log("datos listos")
        alerta.className = "alert alert-danger my-5 d-none";
        return true;
    }else{
        console.log("datos mal")
        alerta.className = "alert alert-danger my-5";
        return false;
    }
}
