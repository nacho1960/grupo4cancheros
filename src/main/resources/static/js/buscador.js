$(function () {
    // Datepicker
    $("#start-date, #end-date").datepicker({
        dateFormat: "dd-mm-yy",
        showAnim: "slideDown",
        minDate: 0, // No permitir seleccionar fechas anteriores a hoy
        maxDate: "+1Y", // Permitir seleccionar hasta un año a partir de hoy
        changeMonth: true, // Permitir cambiar el mes mediante un menú desplegable
        changeYear: true // Permitir cambiar el año mediante un menú desplegable
    });

    // Inicialización del timepicker
    /*$("#start-time, #end-time").timepicker({
        timeFormat: "HH:mm", // Formato de la hora
        interval: 60, // Intervalo de minutos
        startTime: "09:00", // Hora de inicio
        dynamic: false, // Deshabilitar cambios dinámicos
        dropdown: true, // Usar menú desplegable
        scrollbar: true // Usar scrollbar
    });*/

    //FUNCIONALIDAD BUSCAR POR PALABRA CLAVE (NOMBRES DE LOS PRODUCTOS Y CARACTERISTICAS)
    // Autocomplete
    let availableTags = [];

    //Obtengo los productos
    function obtenerProductos() {
        const url = 'http://localhost:8080/productos/listarTodos';
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {

                data.forEach(producto => {
                    if(!availableTags.includes(producto.nombreProducto)){
                        availableTags.push(producto.nombreProducto); //Agregamos el nombre de los productos al array availableTags
                    }
                    
                    producto.caracteristicas.forEach(caracteristica => { 
                        //Verificamos que la caracteristica no exista en availableTags
                        if (!availableTags.includes(caracteristica.nombre)) {
                            // Si no existe, entonces lo agregamos
                            availableTags.push(caracteristica.nombre);
                        }
                    });
                });
            })
    }

    obtenerProductos();

    console.log(availableTags);

    //INPUT CARACTERÍSTICAS
    function obtenerCaracteristicas() {
        const selectCaracteristica = document.getElementById("caracteristica")

        const url = 'http://localhost:8080/caracteristicas/all';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {

                data.forEach(caracteristica => {
                    const optionCaracteristica = document.createElement("option");
                    optionCaracteristica.value = caracteristica.idCaracteristica;
                    optionCaracteristica.textContent = caracteristica.nombre;
                    selectCaracteristica.appendChild(optionCaracteristica);

                });
            });

    }

    obtenerCaracteristicas()

    $("#keyword").autocomplete({
        source: availableTags, //Especifica que las opciones de autocompletado provienen del array availableTags.
        select: function (event, ui) { //Define una función que se ejecuta cuando el usuario selecciona una opción del menú de autocompletado.
            $("#feedback").text("Seleccionaste: " + ui.item.value); // Actualiza el contenido del elemento con el ID feedback para mostrar el valor seleccionado por el usuario.
        }
    });

    // Feedback interactivo
    $("#keyword").on("input", function () { //Selecciona el elemento con el ID keyword y añade un controlador de eventos que se ejecuta cada vez que el valor del campo de texto cambia.
        var query = $(this).val(); //Obtiene el valor actual del campo de texto y lo almacena en la variable query
        if (query.length > 0) {
            $("#feedback").text("Buscando: " + query); // Si el campo de texto tiene algún valor, actualiza el contenido del elemento con el ID feedback para mostrar "Buscando: " seguido del valor actual del campo de texto.
        } else {
            $("#feedback").text(""); //Si el campo de texto está vacío, borra el contenido del elemento feedback.
        }
    });

    //
})
