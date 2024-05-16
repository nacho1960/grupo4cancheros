window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');
    const divDetail = document.getElementById("detail");
    const divDescripcionYCard = document.getElementById("descripcionYcard");
    const divTitulo = document.getElementById("titulo");


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
            let descripcionTexto = producto.categoria.descripcion;
            descripcionTexto = descripcionTexto.split('\n').join('<br>');
            descripcionDiv.innerHTML = descripcionTexto;
            descripcionDiv.style.fontWeight = 600;
            divDescripcionYCard.appendChild(descripcionDiv);

            let divCard = document.createElement("div");
            divCard.classList.add('divCard');
            let precio = document.createElement("p");
            precio.textContent = '$ ' + producto.categoria.precioHora + ' USD Por Hora';
            precio.style.fontWeight = 600;

            let divHorarios = document.createElement("div");
            divHorarios.classList.add('divHorarios');
            let tituloHorarios = document.createElement("p");
            tituloHorarios.textContent = 'Horarios:';
            tituloHorarios.style.fontWeight = 600;
            let horarios = document.createElement("p");
            horarios.innerHTML = 'Lunes a Viernes: 13:00 - 02:00am<br>Sábados y Domingos: 10:00 - 02:00am';
            let buttonReserva = document.createElement('button');
            buttonReserva.classList.add('buttonReserva');
            divHorarios.appendChild(tituloHorarios);
            divHorarios.appendChild(horarios);

            buttonReserva.textContent = 'Reserva';
        
            divCard.appendChild(precio);
            divCard.appendChild(divHorarios);
            divCard.appendChild(buttonReserva);

            divDescripcionYCard.appendChild(divCard);

            let img = document.createElement('img')
            img.classList.add('imgProd')
            img.src = producto.imagen;
            divDetail.appendChild(img)

        });
});