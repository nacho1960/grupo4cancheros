window.addEventListener('load', async function () {
    const listaReservas = document.getElementById('listaReservas');

    if (!listaReservas) {
        console.error("No se encontró el elemento con id 'listaReservas'. Asegúrate de que el elemento existe en el HTML.");
        return;
    }

    try {
        // Obtener el id del usuario (debes ajustar esto según cómo obtienes el usuario autenticado)
        const urlUser = 'http://localhost:8080/user/detail';
        const responseUser = await fetch(urlUser, { method: 'GET' });

        if (!responseUser.ok) {
            throw new Error('Error al obtener el usuario');
        }

        const dataUser = await responseUser.json();
        const idUsuario = dataUser.id;

        // Obtener el historial de reservas del usuario
        const urlReservas = `http://localhost:8080/reservas/listarReservas/${idUsuario}`;
        const responseReservas = await fetch(urlReservas, { method: 'GET' });

        if (!responseReservas.ok) {
            throw new Error('Error al obtener el historial de reservas');
        }

        const reservas = await responseReservas.json();

        if (reservas.length === 0) {
            const sinReservas = document.createElement('p');
            sinReservas.textContent = 'No hay reservas en el historial.';
            listaReservas.appendChild(sinReservas);
        } else {
            reservas.forEach(reserva => {
                const reservaDiv = document.createElement('div');
                reservaDiv.className = 'reserva';

                const nombreProducto = document.createElement('h3');
                nombreProducto.textContent = reserva.producto.nombreProducto;

                const descripcion = document.createElement('p');
                descripcion.textContent = `Descripción: ${reserva.producto.descripcion}`;

                const categoria = document.createElement('p');
                categoria.textContent = `Categoría: ${reserva.producto.categoria ? reserva.producto.categoria.nombre : 'Sin categoría'}`;

                const caracteristicas = document.createElement('p');
                caracteristicas.textContent = `Características: ${reserva.producto.caracteristicas.length > 0 ? reserva.producto.caracteristicas.map(c => c.nombre).join(', ') : 'Sin características'}`;

                const imagenProducto = document.createElement('img');
                imagenProducto.src = reserva.producto.imagenProducto;
                imagenProducto.alt = reserva.producto.nombreProducto;

                const precioHora = document.createElement('p');
                precioHora.textContent = `Precio por hora: USD $${reserva.producto.precioHora}`;

                const fechaReserva = document.createElement('p');
                fechaReserva.textContent = `Fecha de reserva: ${reserva.fechaInicio}`;

                const horaReserva = document.createElement('p');
                horaReserva.textContent = `Hora de reserva: ${reserva.horaInicio}`;

                reservaDiv.appendChild(nombreProducto);
                reservaDiv.appendChild(descripcion);
                reservaDiv.appendChild(categoria);
                reservaDiv.appendChild(caracteristicas);
                reservaDiv.appendChild(imagenProducto);
                reservaDiv.appendChild(precioHora);
                reservaDiv.appendChild(fechaReserva);
                reservaDiv.appendChild(horaReserva);

                listaReservas.appendChild(reservaDiv);
            });
        }
    } catch (error) {
        console.error("Error al obtener el historial de reservas:", error);
    }
});
