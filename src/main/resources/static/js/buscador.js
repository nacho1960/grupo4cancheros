$(function () {
    // Daterangepicker
    $("#date").daterangepicker({
        singleDatePicker: true, // Habilita la selección de una sola fecha
        minDate: moment(), // Fecha minima para seleccionar: hoy
        maxDate: moment().add(2, 'year'), // Fecha maxima en la que puede seleccionar: un año.
        autoUpdateInput: false,
        locale: {
            format: 'DD/MM/YYYY', // Especifica el formato de la fecha. 
            applyLabel: 'Aplicar', // Texto del botón para aplicar la selección del rango de fechas.
            cancelLabel: 'Cancelar', // Texto del botón para cancelar la selección del rango de fechas.
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Nombres completos de los meses del año.
            firstDay: 1 // Define el primer día de la semana. 1 indica que la semana comienza el lunes.
        }
    }).on('apply.singleDate', function (ev, picker) {
        // Al seleccionar el rango, actualizamos el valor del input manualmente con las fechas seleccionadas
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    });

    // Timepicker
    $("#hour").timepicker({
        timeFormat: "HH:mm", // Formato de la hora
        interval: 60, // Intervalo de minutos
        minTime: '09:00',
        maxTime: '21:00',
        startTime: "09:00", // Hora de inicio
        dynamic: false, // Ajusta automáticamente las horas mínimas y máximas dependiendo de la hora actual
        dropdown: true, // Usar menú desplegable
        scrollbar: true, // Usar scrollbar
    });

    //FUNCIONALIDAD BUSCAR POR PALABRA CLAVE (NOMBRES DE LOS PRODUCTOS Y CARACTERISTICAS)
    // Autocomplete
    let availableTags = [];

    //Obtengo los productos
    function obtenerProductos() {
        const url = 'http://localhost:8080/productos/listarTodos';
        const settings = {
            method: 'GET'
        };

        return fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                data.forEach(producto => {
                    if (!availableTags.includes(producto.nombreProducto)) {
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

                console.log("Productos obtenidos:", data); // Para depuración
                return data; // Retornar los productos obtenidos
            });
    }

    obtenerProductos().then(productos => {
        $("#keyword").autocomplete({
            source: availableTags, //Especifica que las opciones de autocompletado provienen del array availableTags.
        });

        //FUNCIONALIDAD: BUSCAR
        document.getElementById("buscar").addEventListener("click", function () {
            // Obtener valores de los campos de entrada
            let keyword = document.getElementById("keyword").value;
            console.log("Esta es mi palabra: " + keyword);

            let categoria = document.getElementById("categoria").value;
            console.log("Esta es mi categoria: " + categoria);

            let caracteristica = document.getElementById("caracteristica").value;
            console.log("Esta es mi caracteristica: " + caracteristica);

            let date = document.getElementById("date").value;
            console.log("Este es mi fecha: " + date);

            let time = document.getElementById("hour").value;
            console.log("Esta es la hora de la reserva: " + time);

            // Parsear fecha
            let fechSeleccionada = null;
            if (date) {
                fechSeleccionada = date
            }

            // Parsear horas
            let hora = time ? time : null;

            // Realizar el filtrado de productos utilizando los valores obtenidos
            let resultadosFiltrados = productos.filter(producto => {
                console.log("Producto:", producto); // Para depuración

                // Filtrar por palabra clave
                if (keyword && !producto.nombreProducto.includes(keyword)) {
                    return false;
                }
                // Filtrar por categoría
                if (categoria && (!producto.categoria || producto.categoria.nombre !== categoria)) {
                    return false;
                }
                // Filtrar por características
                if (caracteristica && !producto.caracteristicas.some(c => c.nombre.includes(caracteristica))) {
                    return false;
                }

                // Parsear fecha
                let fechSeleccionada = null;
                if (date) {
                    fechSeleccionada = date
                }

                // Parsear horas
                let hora = time ? time : null;

                // Realizar el filtrado de productos utilizando los valores obtenidos
                let resultadosFiltrados = productos.filter(producto => {
                    console.log("Producto:", producto); // Para depuración
                    // Filtrar por palabra clave
                    if (keyword && !producto.nombreProducto.includes(keyword)) {
                        return false;
                    }
                    // Filtrar por categoría
                    if (categoria && (!producto.categoria || producto.categoria.nombre !== categoria)) {
                        return false;
                    }
                    // Filtrar por características
                    if (caracteristica && !producto.caracteristicas.some(c => c.nombre.includes(caracteristica))) {
                        return false;
                    }

                    //Filtrado por fecha
                    if (producto.fechaInicio && producto.fechaFin) {
                        const productoFechaInicio = parseDate(producto.fechaInicio);
                        const productoFechaFin = parseDate(producto.fechaFin);
                        const fechaInicioFiltroDate = fechaInicioFiltro ? parseDate(fechaInicioFiltro) : null;
                        const fechaFinFiltroDate = fechaFinFiltro ? parseDate(fechaFinFiltro) : null;

                        // Comparar solo año, mes y día de las fechas
                        if (fechaInicioFiltroDate &&
                            (productoFechaInicio < fechaInicioFiltroDate)) {
                            return false;
                        }

                        if (fechaFinFiltroDate &&
                            (productoFechaFin > fechaFinFiltroDate)) {
                            return false;
                        }
                    } else if (fechaFinFiltro && fechaInicioFiltro) {
                        return false;
                    }

                    //Filtrado por hora
                    if (producto.hora) {
                        if (hora && producto.hora && producto.hora < hora) {
                            return false;
                        }
                    } else if (hora && hora) {
                        return false;
                    }

                    return true;
                });
            });

            console.log("Resultados filtrados:", resultadosFiltrados); // Para depuración
            // Mostrar los resultados filtrados
            mostrarResultados(resultadosFiltrados);
        });
    });

    //INPUT CARACTERÍSTICAS
    function obtenerCaracteristicas() {
        const selectCaracteristica = document.getElementById("caracteristica");

        const url = 'http://localhost:8080/caracteristicas/all';
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                data.forEach(caracteristica => {
                    const optionCaracteristica = document.createElement("option");
                    optionCaracteristica.value = caracteristica.nombre;
                    optionCaracteristica.textContent = caracteristica.nombre;
                    selectCaracteristica.appendChild(optionCaracteristica);
                });

                console.log("Características obtenidas:", data); // Para depuración
            });
    }

    obtenerCaracteristicas();

    function mostrarResultados(resultados) {
        //Desaparecer la sección de recomendaciones
        const recomendaciones = document.getElementById("recomendaciones")
        recomendaciones.style.display = "none";
        const productosRecomendados = document.getElementById("showProductos")
        productosRecomendados.style.display = "none";

        // Limpiar resultados anteriores
        document.getElementById("resultados").innerHTML = "";

        let contenedorTitulo = document.createElement("div");
        contenedorTitulo.className = "contenedorTituloResultados";
        let titulo = document.createElement("h1");
        titulo.textContent = "Resultados de la búsqueda";
        titulo.className = "tituloResultados";
        contenedorTitulo.appendChild(titulo);

        // Verificar si hay resultados
        if (resultados.length === 0) {
            let mensajeError = document.createElement("p");
            mensajeError.textContent = "No se encontraron resultados.";
            mensajeError.className = "mensajeErrorResultados"

            document.getElementById("resultados").appendChild(contenedorTitulo);
            document.getElementById("resultados").appendChild(mensajeError);

            recomendaciones.style.display = "block";
            productosRecomendados.style.display = "grid";
            return;
        }

        // Mostrar los resultados (cards de los productos encontrados)
        let listaResultados = document.createElement("div");
        listaResultados.className = "listaResultados";
        resultados.forEach(resultado => {

            const card = document.createElement("div");
            card.className = "cardResultados"

            const imagen = document.createElement('img');
            imagen.src = resultado.imagen;
            imagen.style.maxWidth = '100%';

            const nombre = document.createElement('h2');
            nombre.textContent = resultado.nombreProducto;

            const descripcionProducto = document.createElement('p');
            descripcionProducto.textContent = resultado.descripcion;

            const descripcionCategoria = document.createElement('p');
            descripcionCategoria.textContent = resultado.categoria ? resultado.categoria.descripcion : 'Sin categoría';

            const preciotitulo = document.createElement('h2');
            preciotitulo.textContent = 'Precio por Hora (USD $$) ';

            const precio = document.createElement('p');
            precio.textContent = resultado.precioHora;

            const verMasLink = document.createElement('a');
            verMasLink.textContent = 'Ver más';
            verMasLink.classList.add('ver-mas-link');
            verMasLink.href = './detailProd.html?id=' + resultado.idProducto;

            if (window.isUserLoggedIn) {

                const likeFavorito = document.createElement('button');
                likeFavorito.classList.add('favorite-btn');
                const heartIcon = document.createElement('i');
                heartIcon.classList.add('heart-icon', 'fas', 'fa-heart');
                likeFavorito.appendChild(heartIcon);

                card.appendChild(imagen);
                card.appendChild(nombre);
                card.appendChild(descripcionProducto);
                card.appendChild(descripcionCategoria);
                card.appendChild(preciotitulo);
                card.appendChild(precio);
                card.appendChild(likeFavorito);
                card.appendChild(verMasLink);

                listaResultados.appendChild(card);

                likeFavorito.addEventListener('click', () => {
                    likeFavorito.classList.toggle('favorited');
                    const productId = card.dataset.id;

                    if (likeFavorito.classList.contains('favorited')) {
                        addToFavorites(productId);
                    } else {
                        removeFromFavorites(productId);
                    }
                });
            } else {
                card.appendChild(imagen);
                card.appendChild(nombre);
                card.appendChild(descripcionProducto);
                card.appendChild(descripcionCategoria);
                card.appendChild(preciotitulo);
                card.appendChild(precio);
                card.appendChild(verMasLink);
                listaResultados.appendChild(card);
            }

        });
        let contenedorResultados = document.getElementById("resultados")
        contenedorResultados.appendChild(contenedorTitulo);
        contenedorResultados.appendChild(listaResultados);

    }
});

const parseDate = dateString => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // Mes se resta 1 porque en JavaScript los meses van de 0 a 11
};