window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');

    //Sección detalle del producto
    const nombreProducto = document.getElementById("nombreProducto");
    const descripcionProducto = document.getElementById("descripcionProductoYCategoria");
    const caracteristicasProducto = document.getElementById("caracteristicas");
    const imagenProducto = document.getElementById("imagenProducto");
    const precioProducto = document.getElementById("precioProducto");
    const nombreCategoria = document.getElementById("nombreCategoria");
    const imgCategoria = document.getElementById("imgCategoria");

    //Sección detalle de la reserva
    const fechaReserva = document.getElementById("fechaReserva");
    const horaReserva = document.getElementById("horaReserva");

    //Botón confirmar reserva
    const botonConfirmarReserva = document.getElementById("buttonConfirmarReserva")


    //Obtenemos los datos del producto en cuestión
    const url = 'http://localhost:8080/productos/' + idProducto;
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(producto => {
            nombreProducto.textContent = producto.nombreProducto;

            if (producto.categoria) {
                descripcionProducto.textContent = producto.descripcion + " " + producto.categoria.descripcion;
                imgCategoria.src = producto.categoria.imagen;
                nombreCategoria.textContent = producto.categoria.nombre;
            } else {
                descripcionProducto.textContent = producto.descripcion;
                imgCategoria.style.display = "none";
                nombreCategoria.textContent = "Sin categoría"
            }

            if (producto.caracteristicas.length > 0) {
                producto.caracteristicas.forEach(caracteristica => {
                    const containerCaracteristica = document.createElement("div");
                    const imgCaracteristica = document.createElement("img");
                    const nombreCaracteristica = document.createElement("p");

                    imgCaracteristica.src = caracteristica.imagen;
                    nombreCaracteristica.textContent = caracteristica.nombre;

                    containerCaracteristica.appendChild(imgCaracteristica);
                    containerCaracteristica.appendChild(nombreCaracteristica);

                    caracteristicasProducto.appendChild(containerCaracteristica)
                });
            } else if (producto.caracteristicas.length <= 0) {
                const sinCaracteristicas = document.createElement("p");
                sinCaracteristicas.textContent = "Sin características"
                caracteristicasProducto.appendChild(sinCaracteristicas)
            }

            imagenProducto.src = producto.imagen;

            precioProducto.textContent = producto.precioHora;
        })


    //Obtenemos la fecha y hora seleccionada en el detalle del producto, las cuales estan guardadas en el localStorage (desarrollado en detailProd.js, líneas 169-170)
    const fechaGuardada = localStorage.getItem("fechaSeleccionada");
    const horaGuardada = localStorage.getItem("horaSeleccionada");

    //Le damos un formato a la fecha:
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }

    //LLenamos los campos fecha y hora seleccionada para que se muestren en los span de detalle de la reserva. 
    fechaReserva.textContent = formatDate(fechaGuardada);
    horaReserva.textContent = horaGuardada;


    //Funcionalidad para realizar la reserva
    botonConfirmarReserva.addEventListener('click', () => {
        //Obtenemos el id del usuario y lo guardamos en la variable idUsuarioObtenido
        const urlUser = 'http://localhost:8080/user/detail';
        const settingsUser = {
            method: 'GET'
        };

        let idUsuarioObtenido

        fetch(urlUser, settingsUser)
            .then(response => response.json())
            .then(data => {
                idUsuarioObtenido = data.id
            })


        //Armado del body para guardar una reserva
        const formData = {
            producto: {
                idProducto: idProducto
            },
            usuario: {
                idUsuario: idUsuarioObtenido
            },
            fechaYHoraInicio: fechaGuardada,
            fechaYHoraFin: horaGuardada
        }

        const url = 'http://localhost:8080/reservas/new';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };

        fetch(url, settings)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .then(data => {
                botonConfirmarReserva.style.display = "none";
                const containerReservaExistosa = createElement("div");
                const spanIcon = document.createElement("span");
                const reservaExitosa = document.createElement("p");

                spanIcon.className = "material-symbols-outlined";
                spanIcon.textContent = task_alt;

                reservaExitosa.textContent = "¡Reserva realizada con éxito!"

                containerReservaExistosa.appendChild(spanIcon);
                containerReservaExistosa.appendChild(reservaExitosa)

                console.log("Reserva realizada:" + data);
            })
            .catch(error => {

                console.log(error);
            });
    })
})