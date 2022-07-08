export class Producto{
    constructor(parametroCodigo, parametroProducto, parametroDescripcion, parametroCantidad, parametroURL){
        this.codigo = parametroCodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.cantidad = parametroCantidad;
        this.url = parametroURL;

    }

    //geters y seters (se agregan siempre?)

    get mostrarCodigo(){
        return this.codigo
    }
    get mostrarProducto(){
        return this.producto
    }
    get mostrarDescripcion(){
        return this.descripcion
    }
    get mostrarCantidad(){
        return this.cantidad
    }
    get mostrarUrl(){
        return this.url
    }
}