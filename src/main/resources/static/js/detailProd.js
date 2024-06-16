window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');
    const divDetail = document.getElementById("detail");
    const divDescripcionYCard = document.getElementById("descripcionYcard");
    const divTitulo = document.getElementById("titulo");
    const divCaracteristicas = document.getElementById("caracteristicas");

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

            let divCard = document.createElement("div");
            divCard.classList.add('divCard');

            let verificaHorario = document.createElement("p");
            verificaHorario.textContent = 'Verifica el horario disponible en el día que deseas realizar la reserva';
            verificaHorario.style.fontWeight = 600;

            let precio = document.createElement("p");
            precio.textContent = '$ ' + producto.precioHora + ' USD Por Hora';
            precio.style.fontWeight = 600;

            let divHorarios = document.createElement("div");
            divHorarios.classList.add('divHorarios');
            let tituloHorarios = document.createElement("p");
            tituloHorarios.textContent = 'Horarios:';
            tituloHorarios.style.fontWeight = 600;

            // Crear y configurar el input de fecha
            let inputFecha = document.createElement("input");
            inputFecha.type = "date";
            inputFecha.name = "fecha";
            inputFecha.id = "fecha";

            // Establecer la fecha mínima del input de fecha al día actual
            let today = new Date().toISOString().split('T')[0];
            inputFecha.value = today;
            inputFecha.min = today;

            // Crear y configurar el select de hora
            let selectHora = document.createElement("select");
            selectHora.name = "hora";
            selectHora.id = "hora";

            // DATOS EJEMPLO PARA LAS RESERVAS
            const reservas = {
                '2024-06-11': ['08:00', '10:00', '12:00'],
                '2024-06-12': ['09:00', '11:00']
            };

            // Función para obtener horas ocupadas desde el servidor (aquí simulado con datos locales)
            function fetchHorasOcupadas(fecha) {
                return new Promise((resolve) => {
                    const horarios = reservas[fecha] || [];
                    resolve(horarios);
                });
            }
            /* VERDADERA FUNCION fetchHorasOcupadas(fecha)
              function fetchHorasOcupadas(fecha) {

                const horarios = reservas[fecha] || [];

                return horarios;
                /*const url = http://localhost:8080/reservas/${fecha};
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
                        horasOcupadas = data[fecha] || [];
                        
                    })
                    .catch(error => {
                        console.error('Ha habido un problema al realizar la operacion:', error);
                    });
            
            
            */

            // Función para actualizar las horas disponibles según la fecha seleccionada
            function actualizarHorasDisponibles() {
                let fechaSeleccionada = inputFecha.value;

                fetchHorasOcupadas(fechaSeleccionada).then(horasOcupadas => {
                    // Limpiar el select de hora
                    selectHora.innerHTML = '';

                    for (let hour = 8; hour <= 23; hour++) {
                        let option = document.createElement("option");
                        let hourString = hour.toString().padStart(2, '0') + ":00";
                        option.value = hourString;
                        option.textContent = hourString;

                        if (horasOcupadas.includes(hourString)) {
                            option.disabled = true;
                            option.style.backgroundColor = '#FF6666'; // Rojo para ocupado
                        } else {
                            option.style.backgroundColor = '#CCFFCC'; // Verde claro para disponible
                        }

                        selectHora.appendChild(option);
                    }
                }).catch(error => {
                    console.error('Error al obtener las horas ocupadas:', error);
                });
            }

            // Llamar a la función para inicializar las horas disponibles
            actualizarHorasDisponibles();

            // Actualizar las horas disponibles cuando cambia la fecha
            inputFecha.addEventListener('change', actualizarHorasDisponibles);

            let buttonReserva = document.createElement('button');
            buttonReserva.classList.add('buttonReserva');
            buttonReserva.textContent = 'Reserva aquí';

            buttonReserva.addEventListener('click', () => {
                //Al hacer click en el botón dirige hacia la pagina de reservas relacionado al producto
                window.location.href = 'reservas.html?id=' + idProducto;
                
                let fechaSeleccionada = inputFecha.value;
                let horaSeleccionada = selectHora.value;

                //Guardamos la fecha y hora seleccionada en el localStorage
                localStorage.setItem("fechaSeleccionada", fechaSeleccionada)
                localStorage.setItem("horaSeleccionada" , horaSeleccionada)
                
                console.log(`Fecha seleccionada: ${fechaSeleccionada}`);
                console.log(`Hora seleccionada: ${horaSeleccionada}`);
                // Aquí puedes añadir el código para procesar la reserva
            });

            divHorarios.appendChild(tituloHorarios);
            divHorarios.appendChild(inputFecha);
            divHorarios.appendChild(selectHora);
            divCard.appendChild(verificaHorario);
            divCard.appendChild(precio);
            divCard.appendChild(divHorarios);
            divCard.appendChild(buttonReserva);

            divDescripcionYCard.appendChild(divCard);

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

