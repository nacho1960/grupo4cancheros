window.addEventListener('load', function () {
    const showProductos = document.getElementById('showProductos');

    // Solicitar todos los productos a la API
    const url = 'http://localhost:8080/productos/listarTodos';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener 8 productos aleatorios
            const productosAleatorios = obtenerProductosAleatorios(data, 8);
            // Mostrar los detalles de los productos en el div viewCategorias
            mostrarProductosEnDiv(productosAleatorios);
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });

    function obtenerProductosAleatorios(productos, cantidad) {
        // Obtener una muestra aleatoria de productos
        const productosAleatorios = [];
        const copiaProductos = [...productos]; // Copiar la lista de productos para no modificar la original
        for (let i = 0; i < cantidad && copiaProductos.length > 0; i++) {
            const indiceAleatorio = Math.floor(Math.random() * copiaProductos.length);
            productosAleatorios.push(copiaProductos.splice(indiceAleatorio, 1)[0]);
        }
        return productosAleatorios;
    }

    function mostrarProductosEnDiv(productos) {
        // Limpiar el div viewCategorias
        showProductos.innerHTML = '';

        // Mostrar cada producto en el div
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.style.maxWidth = '100%';

            const nombre = document.createElement('h2');
            nombre.textContent = producto.nombreProducto;

            const descripcion = document.createElement('p');
            descripcion.textContent = producto.categoria.descripcion;

            const preciotitulo = document.createElement('h2');
            preciotitulo.textContent = 'Precio por Hora: ' 

            const precio = document.createElement('p');
            precio.textContent = producto.categoria.precioHora;

            const verMasButton = document.createElement('button');
            verMasButton.textContent = 'Ver más';
            verMasButton.classList.add('ver-mas-button');

            verMasButton.addEventListener('click', () => {
                console.log('Botón "Ver más" ');
            });

            
            productoDiv.appendChild(imagen);
            productoDiv.appendChild(nombre);
            productoDiv.appendChild(descripcion);
            productoDiv.appendChild(preciotitulo);
            productoDiv.appendChild(precio);
            productoDiv.appendChild(verMasButton);

            showProductos.appendChild(productoDiv);
        });
    }
    
    
});