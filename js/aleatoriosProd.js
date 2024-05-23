window.addEventListener('load', function () {
    mostrarProductosAleatorios();

    // Vincular el evento de clic para el botón "Todas las categorías"
    document.getElementById('BotonTodasCategorias').addEventListener('click', function () {
        mostrarProductosAleatorios();
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('categoria-button')) {
            const categoriaNombre = event.target.textContent;
            console.log(categoriaNombre);
            obtenerProductosPorCategoria(categoriaNombre);
            
        }
    });
    
});

// Función para mostrar productos aleatorios
function mostrarProductosAleatorios() {
    const showProductos = document.getElementById('showProductos');
    const url = 'http://localhost:8080/productos/listarTodos';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productosAleatorios = obtenerProductosAleatorios(data, 10);
            mostrarProductosEnDiv(productosAleatorios);
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Función para obtener una muestra aleatoria de productos
function obtenerProductosAleatorios(productosConCategoria, productosSinCategoria) {
    const productosAleatorios = [];

    // Agregar productos sin categoría
    if (productosSinCategoria.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * productosSinCategoria.length);
        productosAleatorios.push(productosSinCategoria.splice(indiceAleatorio, 1)[0]);
    }

    // Determinar cuántos productos aleatorios restantes necesitamos
    let cantidadRestante = 10 - productosAleatorios.length;

    // Agregar productos con categoría aleatorios
    while (cantidadRestante > 0 && productosConCategoria.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * productosConCategoria.length);
        productosAleatorios.push(productosConCategoria.splice(indiceAleatorio, 1)[0]);
        cantidadRestante--;
    }

    return productosAleatorios;
}


// Función para mostrar productos en el div
function mostrarProductosEnDiv(productos) {
    const showProductos = document.getElementById('showProductos');
    showProductos.innerHTML = '';

    if (productos.length === 0) {
        const noProductos = document.createElement('p');
        noProductos.textContent = 'No se encontraron productos.';
        showProductos.appendChild(noProductos);
        return;
    }

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.style.maxWidth = '100%';

        const nombre = document.createElement('h2');
        nombre.textContent = producto.nombreProducto;

        const descripcion = document.createElement('p');
        descripcion.textContent = producto.categoria ? producto.categoria.descripcion : 'Sin categoría';

        const preciotitulo = document.createElement('h2');
        preciotitulo.textContent = 'Precio por Hora (U$$) ';

        const precio = document.createElement('p');
        precio.textContent = producto.categoria ? producto.categoria.precioHora : 30;

        const verMasLink = document.createElement('a');
        verMasLink.textContent = 'Ver más';
        verMasLink.classList.add('ver-mas-link');
        verMasLink.href = '../html/detailProd.html?id=' + producto.idProducto;

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(descripcion);
        productoDiv.appendChild(preciotitulo);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(verMasLink);

        showProductos.appendChild(productoDiv);
    });
}




// Función para obtener productos por categoría
function obtenerProductosPorCategoria(categoriaNombre) {
    // Realizar la solicitud a la API para obtener todas las categorías
    const urlCategorias = 'http://localhost:8080/categorias/listarTodos';
    const settings = {
        method: 'GET'
    };
    fetch(urlCategorias, settings)
        .then(response => response.json())
        .then(categorias => {
            // Buscar la categoría por su nombre
            const categoriaEncontrada = categorias.find(categoria => categoria.nombre === categoriaNombre);
            
            // Si se encontró la categoría, obtener su ID y hacer la solicitud a la API de productos
            if (categoriaEncontrada) {
                const idCategoriaEncontrada = categoriaEncontrada.idCategoria;
                //console.log(categoriaEncontrada);
                //console.log(categoriaEncontrada.idCategoria);

                const urlProductos = `http://localhost:8080/productos/listarTodos?idCategoria=${idCategoriaEncontrada}`;
                const settingsProductos = {
                    method: 'GET'
                };
                
                // Realizar la solicitud a la API para obtener productos por la categoría
                fetch(urlProductos, settingsProductos)
                    .then(response => response.json())
                    .then(productos => {
                        let productosCategoria = [];

                        // Iterar sobre los productos y acceder al idCategoria de cada uno
                        productos.forEach(producto => {
                            if (producto.categoria && categoriaEncontrada.idCategoria === producto.categoria.idCategoria) {
                                //console.log(producto.categoria.idCategoria);
                                productosCategoria.push(producto);
                            } 
                        });

                        // Mostrar los productos en el div correspondiente
                        mostrarProductosEnDiv(productosCategoria);
                    })
                    .catch(error => {
                        console.error('Error al obtener los productos por categoría:', error);
                    });
            } else {
                console.error('No se encontró la categoría:', categoriaNombre);
            }
        })
        .catch(error => {
            console.error('Error al obtener las categorías:', error);
        });
}
