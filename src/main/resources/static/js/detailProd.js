window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');
    const divDetail = document.getElementById("detail");
    const divDescripcionYCard = document.getElementById("descripcionYcard");
    const divTitulo = document.getElementById("titulo");
    const divCaracteristicas = document.getElementById("caracteristicas");
    const precioProducto = document.getElementById("precioProducto");
    const buttonReserva = document.getElementById("buttonReserva");
    let dateRangeInput = document.getElementById("date-range");
    let startTimeInput = document.getElementById("start-time");
    let endTimeInput = document.getElementById("end-time");

    const url = 'http://localhost:8080/productos/' + idProducto;
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(producto => {
            // Crear elementos para mostrar la información del producto
            let nombreProducto = document.createElement("h1");
            nombreProducto.textContent = producto.nombreProducto;
            divTitulo.appendChild(nombreProducto);

            let descripcionDiv = document.createElement("div");

            let productoDiv = document.createElement("div");
            productoDiv.classList.add('seccionProducto');
            let descripcionProducto = document.createElement('p');

            let descripcionCategoria = document.createElement('p');

            if (producto.categoria) {
                descripcionProducto.textContent = producto.descripcion;
                descripcionCategoria.textContent = producto.categoria.descripcion;
            } else {
                descripcionProducto.textContent = producto.descripcion;
                descripcionCategoria.style.display = 'none';
            }

            productoDiv.appendChild(descripcionProducto);

            descripcionDiv.appendChild(productoDiv);
            descripcionDiv.appendChild(descripcionCategoria);
            descripcionDiv.classList.add('descripciones')
            descripcionDiv.style.fontWeight = 600;
            descripcionDiv.style.display = 'flex';
            divDescripcionYCard.appendChild(descripcionDiv);

            precioProducto.textContent = '$ ' + producto.precioHora + ' USD Por Hora';
            precioProducto.style.fontWeight = 600;

            // Calendario doble
            $("#date-range").daterangepicker({
                minDate: moment(), // Fecha minima para seleccionar: hoy
                maxDate: moment().add(2, 'year'), // Fecha maxima en la que puede seleccionar: un año.
                autoUpdateInput: false,
                showDropdowns: true, //Menú desplegable para cambiar de mes y año.
                locale: {
                    format: 'DD/MM/YYYY', // Especifica el formato de la fecha. 
                    separator: ' - ', // Define el separador que se utiliza entre las fechas de inicio y fin en el input.
                    applyLabel: 'Aplicar', // Texto del botón para aplicar la selección del rango de fechas.
                    cancelLabel: 'Cancelar', // Texto del botón para cancelar la selección del rango de fechas.
                    weekLabel: 'S', // Etiqueta de la columna de números de semana.
                    daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Nombres completos de los meses del año.
                    firstDay: 1 // Define el primer día de la semana. 1 indica que la semana comienza el lunes.
                }
            }).on('apply.daterangepicker', function (ev, picker) {
                // Al seleccionar el rango, actualizamos el valor del input manualmente con las fechas seleccionadas
                $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            });

            // Hora inicio
            $("#start-time").timepicker({
                timeFormat: "HH:mm", // Formato de la hora
                interval: 60, // Intervalo de minutos
                minTime: '09:00',
                maxTime: '21:00',
                startTime: "09:00", // Hora de inicio
                dynamic: true, // Ajusta automáticamente las horas mínimas y máximas dependiendo de la hora actual
                dropdown: true, // Usar menú desplegable
                scrollbar: true, // Usar scrollbar
            });

            //Hora fin
            $("#end-time").timepicker({
                timeFormat: "HH:mm", // Formato de la hora
                interval: 60, // Intervalo de minutos
                minTime: '09:00',
                maxTime: '21:00',
                startTime: "09:00", // Hora de inicio
                dynamic: true, // Ajusta automáticamente las horas mínimas y máximas dependiendo de la hora actual
                dropdown: true, // Usar menú desplegable
                scrollbar: true, // Usar scrollbar
            });


            // Función para actualizar las horas disponibles según la fecha seleccionada
            function actualizarHorasDisponibles() {
                let rangoFechas = dateRangeInput.value;
                let startTime = startTimeInput.value;
                let endTime = endTimeInput.value;

                const url = 'http://localhost:8080/productos/listarReservas/' + idProducto;
                const settings = {
                    method: 'GET'
                };

                fetch(url, settings)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        data.forEach(reserva => {
                            let fechaInicioReserva = reserva.fechaInicio;
                            let fechaFinReserva = reserva.fechaFin;
                            console.log(reserva);

                            // Agregar las fechas ocupadas al array
                            let currentDate = fechaInicioReserva;
                            while (currentDate.isSameOrBefore(fechaFinReserva)) {
                                reservasFechasOcupadas.push(currentDate.format('DD/MM/YYYY'));
                                currentDate = currentDate.add(1, 'day');
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error al listar las reservas asociadas al producto:', error);
                    });

                // Función para deshabilitar las fechas ocupadas
                let isFechaOcupada = function (date) {
                    return reservasFechasOcupadas.includes(date);
                };

                dateRangeInput.data('daterangepicker').setOptions({
                    isInvalidDate: isFechaOcupada
                });

                // Marcar las horas ocupadas en start-time y end-time
                let horasOcupadas = [];
                reservas.forEach(reserva => {
                    if (reservasFechasOcupadas.includes(reserva.fechaInicio.format('DD/MM/YYYY'))) {
                        horasOcupadas.push({
                            start: reserva.horaInicio,
                            end: reserva.horaFin
                        });
                    }
                });

                // Función para deshabilitar las horas ocupadas
                let isHoraOcupada = function (dateTime) {
                    let horaInicio = moment(dateTime).format('HH:mm');
                    return horasOcupadas.some(rango => {
                        return moment(horaInicio, 'HH:mm').isBetween(moment(rango.start, 'HH:mm'), moment(rango.end, 'HH:mm'), null, '[]');
                    });
                };
            }


            // Llamar a la función para inicializar las horas disponibles
            actualizarHorasDisponibles();

            // Evento para actualizar las horas disponibles cuando cambia la fecha
            dateRangeInput.addEventListener('change', actualizarHorasDisponibles);
            //Evento al botón de reserva aqui y guardado del rango horario y fechas en el localStorage.
            buttonReserva.addEventListener('click', () => {
                //Al hacer click en el botón dirige hacia la pagina de reservas relacionado al producto
                window.location.href = 'reservas.html?id=' + idProducto;

                let fechaSeleccionada = inputFecha.value;
                let horaSeleccionada = selectHora.value;

                //Guardamos la fecha y hora seleccionada en el localStorage
                localStorage.setItem("fechaSeleccionada", fechaSeleccionada)
                localStorage.setItem("horaSeleccionada", horaSeleccionada)

                console.log(`Fecha seleccionada: ${fechaSeleccionada}`);
                console.log(`Hora seleccionada: ${horaSeleccionada}`);
            });






            producto.caracteristicas.forEach(caracteristica => {
                const caracteristicaUnicaDiv = document.createElement('div');
                caracteristicaUnicaDiv.classList.add('caracteristica');

                let imagenCaracteristica = document.createElement("img");
                imagenCaracteristica.src = caracteristica.imagen;
                imagenCaracteristica.alt = caracteristica.nombre;

                let nombreCaracteristica = document.createElement("h4");
                nombreCaracteristica.classList.add('nombreCaracteristica');
                nombreCaracteristica.textContent = caracteristica.nombre;

                caracteristicaUnicaDiv.appendChild(nombreCaracteristica);
                caracteristicaUnicaDiv.appendChild(imagenCaracteristica);

                divCaracteristicas.appendChild(caracteristicaUnicaDiv);
            });

            let img = document.createElement('img');
            img.classList.add('imgProd');
            img.src = producto.imagen;
            img.style.height = '100%';
            divDetail.appendChild(img);
        });
});

//Listamos todas las reservas que tiene el producto en cuestión


