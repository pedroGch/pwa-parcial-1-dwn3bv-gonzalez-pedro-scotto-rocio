<?PHP
//inicializo variables con los datos que necesito traer de la superglobal
$inputNombre = $_POST['inputNombre'];
$inputApellido = $_POST['inputApellido'];
$inputEmail = $_POST['inputEmail'];
$inputComentario = $_POST['inputComentario'];

if ((isset($inputNombre) and !empty(trim($inputNombre))) and
    (isset($inputApellido) and !empty(trim($inputApellido))) and
    (isset($inputEmail) and !empty(trim($inputEmail))) and
    (isset($inputComentario) and !empty(trim($inputComentario)))
) {
    echo "<pre>";
    print_r("<div>
            <h2>Muchas gracias por tu mensaje!</h2>
                <p>Te contactaremos a la brevedad.</p>
    
                <h3>Estos son los datos que nos enviaste:</h3>
                <ul>
                    <li><p>Nombre: $inputNombre </p></li>
                    <li><p>Apellido: $inputApellido </p></li>
                    <li><p>Email: $inputEmail </p></li>
                    <li><p>Comentario: $inputComentario </p></li>
                </ul>
         </div>");
    echo "</pre>";
    
} else {
    echo "<pre>";
    print_r("<div>
                <h2>Ooops</h2>
                <p>Chequeá los campos ya que alguno/s contienen errores.</p>
            </div>");
    echo "</pre>";
}






//lo que elijo imprimir en pantalla para mostrar al usuario
