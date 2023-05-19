class Carrito{
  
  productos;
 
  constructor(){
    this.productos = [];
  }

  agregarProducto(producto){
    this.productos.push(producto);
  }

  devolverProductos(){
    return this.productos;
  }

  cantidadDeProductos(){
    return this.productos.length;
  }

  quitarProductoDelCarrito(idProducto){
    let producto = null; 

    this.productos.forEach(element => {
      if (element.id == idProducto){
        producto = element;
      }
    });


    this.productos.splice(this.productos.indexOf(producto), 1);
  }

  mostrarPrecioTotalDeLaCompra(){
    let total = 0;
    this.productos.forEach(p => {
      total += p.precio; 
    });
    return total; 
  }

  quitarTodosLosProducto(){
    this.productos = []
  }

  mostrarCardProducto(p){
      //este es el div del card
      
      var divContenedorProducto = document.createElement("div");
      divContenedorProducto.className = "row bg-light-violet rounded-3 mb-2 mx-5";
  
      //este es el div de la imagen
      let divContenedorImagen = document.createElement("div");
      divContenedorImagen.className = "col-2 my-2 align-self-center";
  
      //esta imagen va dentro del div card
      let imgCardPrducto = document.createElement("img");
      imgCardPrducto.className = "card-img-top img-fluid";
      imgCardPrducto.setAttribute("src",`${p.urlImagen}`);
      imgCardPrducto.setAttribute("alt",`mandala con colores vibrantes`);
  
  
      //este es el div del card
      let divDescript = document.createElement("div");
      divDescript.className = "col-10 d-flex flex-column px-5";
  
      //boton de compra del producto
      let botonEliminarProducto = document.createElement("button");
      botonEliminarProducto.className = "btn text-dark-violet align-self-end p-2 pt-3";
      botonEliminarProducto.setAttribute("onclick",`quitarProductoDelCarrito(${p.id}, this) `);
      botonEliminarProducto.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
      </svg>
      `;
  
      let tituloCardBody = document.createElement("h3");
      tituloCardBody.className = "card-title fs-4 fw-bold";
      tituloCardBody.innerText = `${p.nombre}`;
  
      //precio del producto
      let precioCardBody = document.createElement("p");
      precioCardBody.className = "fs-3 fw-semibold pb-3";
      precioCardBody.innerText = `${p.precio}`;
  
      divDescript.append(botonEliminarProducto);
      divDescript.append(tituloCardBody);
      divDescript.append(precioCardBody);
  
      divContenedorImagen.append(imgCardPrducto);
  
      divContenedorProducto.append(divContenedorImagen);
  
      divContenedorProducto.append(divDescript);
      return divContenedorProducto;
  }
}