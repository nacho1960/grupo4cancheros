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

            const nombre = document.createElement('h2');
            nombre.textContent = producto.nombreProducto;

            const descripcion = document.createElement('p');
            descripcion.textContent = producto.categoria.descripcion;

            const precio = document.createElement('p');
            precio.textContent = 'Precio: ' + producto.categoria.precioHora;

            productoDiv.appendChild(nombre);
            productoDiv.appendChild(descripcion);
            productoDiv.appendChild(precio);

            showProductos.appendChild(productoDiv);
        });
    }
});
