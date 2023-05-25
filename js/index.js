/*
 *  APELLIDOS: SCOTTO, GONZALEZ CHAVEZ
 */

var arregloProductos = [];


async function cargarArray(){
    const hayProductos = mostrarLocalStorageProductos();
    if(hayProductos != null && hayProductos != undefined) {
        arregloProductos = hayProductos;
        mostrarTodosLosProductos(arregloProductos);
    }else{
        try {
            await fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>{
                    arregloProductos = json;
                    
                })
        } catch (error) {
            console.log(error)
        }
    }
}

let contenedorProducto = document.querySelector("#productosTienda");
let carritoDeCompras = new Carrito();
let cantidadDeProductos  = document.querySelector("#monstrarCantidad");
let removerTodosLosProductos = document.querySelector("#removeAllProd");
let tuTotalCantidad = document.querySelector("#tuTotalCantidad");

function mostrarTodosLosProductos(arreglo){

    arreglo.forEach((p)=>{
        let productoObject = new Producto(p.title, p.description, p.price, p.image, p.category, p.id,null);
        contenedorProducto.append(productoObject.imprimirProducto());
    })
}

function agregarAlCarrito(idProducto){
    fetch('https://fakestoreapi.com/products/'+ idProducto)
        .then(res=>res.json())
        .then(json=>{
            let productoObject = new Producto(json.title, json.description, json.price, json.image, json.category, json.id, null);
            arregloProductos.push(productoObject);
            carritoDeCompras.agregarProducto(productoObject);
    })

    actualizarLocalStorage();

    cantidadDeProductos.innerText = carritoDeCompras.cantidadDeProductos(); 
    tuTotalCantidad.innerText = carritoDeCompras.cantidadDeProductos(); 
    
    imprimirCarrito()

}

function imprimirCarrito(){
    let contenedorItemProducto = document.querySelector("#contenedorItemCarrito");

    let misProductos = carritoDeCompras.devolverProductos();
    contenedorItemProducto.replaceChildren();
    totalCompra ();
    misProductos.forEach(element => {
        contenedorItemProducto.append(carritoDeCompras.mostrarCardProducto(element));
    });
}

function quitarProductoDelCarrito (idProducto,element){

    let contenedorItem = element.parentNode.parentNode;
    
    contenedorItem.remove();
    carritoDeCompras.quitarProductoDelCarrito(idProducto);

    actualizarLocalStorage();

    cantidadDeProductos.innerText = carritoDeCompras.cantidadDeProductos(); 
    tuTotalCantidad.innerText = carritoDeCompras.cantidadDeProductos(); 
    totalCompra ();

}

function totalCompra (){
    let tuTotal = document.querySelector(".tuTotal");
    tuTotal.innerText = carritoDeCompras.mostrarPrecioTotalDeLaCompra(); 
}

vaciarCarrito.addEventListener("click", function(){
    carritoDeCompras.quitarTodosLosProducto();
    document.querySelector("#contenedorItemCarrito").replaceChildren();

    totalCompra ();

    actualizarLocalStorage();

    cantidadDeProductos.innerText = carritoDeCompras.cantidadDeProductos(); 
    tuTotalCantidad.innerText = carritoDeCompras.cantidadDeProductos(); 

});

function mostrarModalDetalle(idProd){
    try {
        fetch('https://fakestoreapi.com/products/'+ idProd)
            .then(res=>res.json())
            .then(json=>{
                let productoObject = new Producto(json.title, json.description, json.price, json.image, json.category, json.id, null);
                arregloProductos.push(productoObject);
                document.querySelector("#contenedorDescripLargo").replaceChildren();
                document.querySelector("#contenedorDescripLargo").append(productoObject.imprimirModal(productoObject));
            })
    } catch (error) {
        console.log(error)
    }
}

/**
 * Local Storage
 */
function actualizarLocalStorage() {
    localStorage.setItem("productosCarrito", JSON.stringify(carritoDeCompras.devolverProductos()));
    //localStorage.setItem("productosCarrito", JSON.stringify(carritoDeCompras));
}

function mostrarLocalStorage() {
    return JSON.parse(localStorage.getItem("productosCarrito"));
}

function mostrarLocalStorageProductos() {
    return JSON.parse(localStorage.getItem("productos"));
}

document.querySelector("select").addEventListener("change", (e) => {
    
    let categoria = e.target.value;
    if (categoria != "todas"){
        let filtrado = arregloProductos.filter((p) => p.categoria.includes(categoria));
    
        contenedorProducto.replaceChildren();
        mostrarTodosLosProductos(filtrado);
        mostrarOferta(categoria);
        
    }else{
        contenedorProducto.replaceChildren();
        mostrarTodosLosProductos(arregloProductos);
        mostrarOferta(categoria);
    }

    
});


/**
 * FUNCION PARA MOSTRAR OFERTA (ES LLAMADA CON EL SELECT DE CATEG)
 */

function mostrarOferta(categoria) { //muestra la oferta en el contenedorOferta

    document.querySelector("#contenedorOferta").innerText = "";

    let cardOferta = document.createElement("div");
    cardOferta.className = "card";
    cardOferta.setAttribute("id", "oferta");

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    switch (categoria) { //cambio el texto del body de la card segun la categoria
        case "mandala":
            cardBody.innerText = "¡SOLO POR HOY! 30% de descuento en la segunda unidad llevando dos packs MANDALAS imprimibles, iguales o diferentes";
            break;
        case "infantil":
            cardBody.innerText = "¡SOLO POR HOY! 30% de descuento en la segunda unidad llevando dos packs INFANTILES imprimibles, iguales o diferentes";
            break;

        case "zentangle":
            cardBody.innerText = "¡SOLO POR HOY! 30% de descuento en la segunda unidad llevando dos packs ZENTANGLE imprimibles, iguales o diferentes";
            break;
    
        default:
            cardBody.innerText = "Disfrutá 3 cuotas sin interés en toda la tienda.";
            break;
    }
    

    cardOferta.append(cardBody); //agrego el body a la card

    document.querySelector("#contenedorOferta").append(cardOferta); //agrego la card al contenedor

    setTimeout(() => { //elimino la card a los 10 segundos

        document.querySelector("#oferta").remove();

    }, 10000);
};

window.addEventListener('DOMContentLoaded', function () { //carga del sw
    if (navigator.serviceWorker && navigator.serviceWorker.register){ //chequea si el navegador soporta sw
        navigator.serviceWorker.register('./../sw.js'); //registra el sw
    }else{
        console.log("no puedo usar service worker");
    }
})
cargarArray() //carga el array de productos
mostrarTodosLosProductos(arregloProductos); //muestra todos los productos
