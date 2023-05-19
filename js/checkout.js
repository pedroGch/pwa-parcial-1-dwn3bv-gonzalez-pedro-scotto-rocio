let carrito = new Carrito();

function cargarCarritoCheckout(){
  devolverLocalStorage().forEach(element => {
    carrito.agregarProducto(element);
  });
}

function mostrarSubTotal(){
  document.querySelector("#valorSubtotalCompra").innerText = carrito.mostrarPrecioTotalDeLaCompra();
};

function mostrarCostoEnvio(costo){
  document.querySelector("#valorEnvio").innerText = costo;
  mostrarTotal(costo)
}
function mostrarTotal(costo){
  document.querySelector("#valorTotalCompra").innerText = costo + carrito.mostrarPrecioTotalDeLaCompra();
}

function mostrarCantidadTotal(){
  document.querySelector("#tuTotalCantidad").innerText = carrito.cantidadDeProductos();
}

function mostrarProductos(){
  let contenedorUL = document.querySelector("#listaCarrito");
  let productos = carrito.devolverProductos()
  productos.forEach((p) => {
    let li = document.createElement("li");
    li.innerText = `${p.nombre}`;
    contenedorUL.append(li);
  })
}

function devolverLocalStorage() {
  return JSON.parse(localStorage.getItem("productosCarrito"));
}

function ocultarMostrarTarjeta(cadena){
  if (cadena == "mostrar"){
      document.querySelector("#tarjetaDatos").style.display = "block";
  }else{
      document.querySelector("#tarjetaDatos").style.display = "none";
  }
}

document.querySelector("form").addEventListener("submit", function(event){
  event.preventDefault()
});

function validarForm(){
 

  let banderas = [];
  //datos de la tarjeta de credito si es que fue seleccionado
  if (document.getElementById("flexRadioTarjetaCredito").checked){  
    banderas.push(validarInput(document.querySelector("#inputtarjeta") ,document.querySelector("#inputtarjeta").value));
    banderas.push(validarNumeroTarjeta(document.querySelector("#inputtarjeta") ,document.querySelector("#inputtarjeta").value));
    banderas.push(validarInput(document.querySelector("#inputvto") ,document.querySelector("#inputvto").value));
    banderas.push(validarInput(document.querySelector("#inputCodigo") ,document.querySelector("#inputCodigo").value));
    banderas.push(validarInput(document.querySelector("#inputNombreTarjeta") ,document.querySelector("#inputNombreTarjeta").value));
    banderas.push(validarInputSoloTexto(document.querySelector("#inputNombreTarjeta") ,document.querySelector("#inputNombreTarjeta").value));
  }

  banderas.push(validarInput(document.querySelector("#inputNombre"),document.querySelector("#inputNombre").value));
  banderas.push(validarInputSoloTexto(document.querySelector("#inputNombre"),document.querySelector("#inputNombre").value));
  banderas.push(validarInput(document.querySelector("#inputApellido"),document.querySelector("#inputApellido").value));
  banderas.push(validarInputSoloTexto(document.querySelector("#inputApellido"),document.querySelector("#inputApellido").value));
  banderas.push(validarInput(document.querySelector("#inputdni"),document.querySelector("#inputdni").value));
  banderas.push(validarInput(document.querySelector("#inputEmail"),document.querySelector("#inputEmail").value));
  banderas.push(validarInput(document.querySelector("#inputelefono"),document.querySelector("#inputelefono").value));

  (banderas.indexOf(false) == -1) ?  imprimirCartelTodoOk () : imprimirCartelError();
}

function validarInput(elemento, valor){
  //si el valor del elemento es nulo se debe agregar un cartel de error en el elemento 
  if (valor == ""){
    //pintar error
    let errorText = elemento.nextElementSibling;
    errorText.innerText = "El campo no puede estar vacío";
    errorText.style.color = "#f44336";
    return false;
  }
  return true;
}

function quitarError(element){
  let errorText  = element.nextElementSibling;
  errorText.innerText = "";
}

function validarInputSoloTexto(element, valor) {
//si el valor del elemento no es un número se debe agregar un cartel de error en el elemento 
if (!isNaN(valor)){
  //pintar error
  let errorText = element.nextElementSibling;
  errorText.innerText = "Debes ingresar sólo texto";
  errorText.style.color = "#f44336";
  return false;
}
return true;

}

function imprimirCartelTodoOk(){
  swal("¡Felicidades! los productos ya son tuyos", "en breve seras redirigido al inicio", "success");
  carrito.quitarTodosLosProducto();
  actualizarLocalStorage();
  setTimeout(function(){
    window.location.href = 'index.html'
  },8000)
}

function imprimirCartelError(){
  swal ( "Oops" ,  "parece que te quedaron campos vacíos o incorrectos!" ,  "error" );
}
function validarNumeroTarjeta(elemento, valor) {
  //Se coloca una variable numerica para poder hacer las operaciones
  let errorText = elemento.nextElementSibling;
  let bandera = true;  
  let numero = 0;
  //Ingresar los datos, si tiene espacios o esta vacio y si no son numeros regresar a prompt
  
  if (valor === null || (isNaN(valor) === true) ){
    errorText.innerText = "Número invalido";
    errorText.style.color = "#f44336";
    bandera = false;
    return bandera;
    }
  //Se van a iterar caracter numerico por caracter
  for (var j= 0; j< valor.length; j++){
    if (isNaN(valor.charAt(j)) === true)
    numero++
  }
  if (numero > 0){
    errorText.innerText = 'El número de tarjeta contiene letras o carácteres especiales, ingrese un número de tarjeta válido.';
    errorText.style.color = "#f44336";
    bandera = false;
  }
  //Despues de validar si los digitos con correcto
  /*Se estara iterando numero a numero, con un array inverso, se estaran sumando y invirtiendo el array
  con los numeros pares*/
  let sum     = 0,
      alt     = false,
      i       = valor.length-1,
      num;
  //Si el numero de caracteres de la tarjeta proporcionada son menores a 13 o mayores a 19
  //la tarjeta se regresa al prompt
  if (valor.length < 13 || valor.length > 19){
    errorText.innerText = 'El número de tarjeta tiene que ser mayor a 13 y menor a 19 dígitos.';
    errorText.style.color = "#f44336";
    bandera = false;
    return bandera;
  }
  //Mientras los numeros sea mayor o igual a 0 se estara tomando cada caracter
  while (i >= 0){
    //Se estaran tomando cada caracter numerico enteros ingresado en tarjeta
    num = parseInt(valor.charAt(i), 10);
    //Valida que el número sea válido
    if (isNaN(num)){
      return false;
    }
    //Válida el cambio true o false de imparidad
    if (alt) {
      num *= 2;
      if (num > 9){
          num = (num % 10) + 1;
      }
    }
    //Voltea el bit de paridad
    alt = !alt;
    //Agrega el número
    sum += num;
    //Continúa con el siguiente dígito
    i--;
  }
  //Determina si la tarjeta es válida
  if (sum % 10 === 0 && sum!==0){
    return bandera;
  }else{
    errorText.innerText = 'El número de tarjeta tiene que ser mayor a 13 y menor a 19 dígitos.';
    errorText.style.color = "#f44336";
    bandera = false;
    return bandera;
  }
}

function deshabilitarBotonCompra(){
  if(carrito.cantidadDeProductos() === 0){
    let botonDesabilitado = document.querySelector('input[type="submit"]');
    botonDesabilitado.setAttribute('disabled', '');
  }
}

cargarCarritoCheckout();
deshabilitarBotonCompra();
mostrarSubTotal();
mostrarCostoEnvio(0);
mostrarCantidadTotal();
mostrarProductos();

