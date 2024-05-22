window.addEventListener('load', function () {
    const botonListar = document.getElementById('listProd');
    const tableDivProd = document.getElementById("divProdTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivCat = document.getElementById('divCatTabla');
    const response = document.getElementById('response');

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    tableDivCat.style.display = 'none';
    response.style.display = 'none';

    botonListar.addEventListener('click', function () {
        tableDivProd.style.display = 'block';
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        tableDivCat.style.display = 'none';
        response.style.display = 'none';

        const url = 'http://localhost:8080/productos/listarTodos';
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById('prodTablaBody');
                table.innerHTML = '';

                data.forEach(producto => {
                    const productoRow = table.insertRow();
                    productoRow.id = 'tr_' + producto.idProducto;

                    const idCelda = productoRow.insertCell();
                    idCelda.textContent = producto.idProducto;

                    const nombreCelda = productoRow.insertCell();
                    nombreCelda.textContent = producto.nombreProducto;

                    const categoriaCelda = productoRow.insertCell();
                    categoriaCelda.textContent = producto.categoria ? producto.categoria.nombre : 'Sin categoría';

                    // Dentro del bucle forEach para crear botones de edición
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.setAttribute('id', 'btn_edit_' + producto.idProducto);
                    editButton.setAttribute('type', 'button');
                    editButton.onclick = () => editProduct(producto.idProducto);

                    const editCelda = productoRow.insertCell();
                    editCelda.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.setAttribute('id', 'btn_delete_' + producto.idProducto);
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.onclick = () => confirmDelete(producto.idProducto);

                    const deleteCelda = productoRow.insertCell();
                    deleteCelda.appendChild(deleteButton);
                });

                tableDivProd.style.display = 'block';
                tableDivProd.style.width = '100%';
            });
    });
});

function confirmDelete(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        const url = 'http://localhost:8080/productos/' + id;
        const settings = {
            method: 'DELETE'
        };

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    document.getElementById('tr_' + id).remove();
                } else {
                    alert('No se pudo eliminar el producto.');
                }
            });
    }
}

function editProduct(id) {
    const url = 'http://localhost:8080/productos/' + id;
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
    .then(response => response.json())
    .then(data => {
        console.log('Datos del producto:', data); // Verificar los datos recibidos

        const titulo = document.getElementById('Titulo');
        titulo.textContent = 'Editar producto';


        // Rellenar los campos del formulario con los datos del producto
        console.log('Nombre del producto:', data.nombreProducto);
        document.getElementById('nombreProd').value = data.nombreProducto;

        radioCat.innerHTML = '<h4>Categoría</h4>';

        // Obtener las categorias desde la API
        const urlCategorias = 'http://localhost:8080/categorias/listarTodos';
        const settingsCategorias = {
            method: 'GET'
        };

        fetch(urlCategorias, settingsCategorias)
            .then(response => response.json())
            .then(categoriasData => {
                // Recorremos la colección de categorias del JSON:
                categoriasData.forEach(categoria => {
                    // Por cada categoría crea un radio
                    var radioLabel = document.createElement("label");
                    var radioInput = document.createElement("input");
                    radioInput.type = "radio";
                    radioInput.value = categoria.idCategoria;
                    radioInput.name = "tipo";
                    radioLabel.appendChild(radioInput);
                    radioLabel.style.marginRight = "10px";
                    radioLabel.appendChild(document.createTextNode(categoria.nombre));
                    radioCat.appendChild(radioLabel);
                });

                // Si el producto tiene una categoría asignada, seleccionar el botón de radio correspondiente
                const categoriaId = data.categoria ? data.categoria.idCategoria : null;
                if (categoriaId) {
                    const categoriaCheckbox = document.querySelector(`input[name="tipo"][value="${categoriaId}"]`);
                    if (categoriaCheckbox) {
                        categoriaCheckbox.checked = true;
                    } else {
                        console.log('No se encontró la categoría correspondiente.');
                    }
                } else {
                    console.log('El producto no tiene categoría.');
                }
            })
            .catch(error => {
                console.error('Error al obtener las categorías:', error);
            });

            if (data.imagen) {
                // Mostrar el nombre de la imagen al lado del campo de entrada
                const nombreImagenSpan = document.getElementById('nombreImagen');
                nombreImagenSpan.textContent = data.imagen; // Cambia esto por el campo de la imagen de tu objeto de datos
            }

            const inputImagen = document.getElementById('imagen');
            inputImagen.addEventListener('change', function() {
                const nombreImagenSpan = document.getElementById('nombreImagen');
                nombreImagenSpan.textContent = ''; // Limpiar el contenido del span
            });
        
            const botonesSubmit = document.querySelectorAll('form button[type="submit"]');

            // Ocultar todos los botones de tipo 'submit'
            botonesSubmit.forEach(boton => {
                boton.style.display = 'none';
            });
        
        // Mostrar el formulario de edición y ocultar la tabla de productos
        const formProd = document.getElementById('formProd');
        formProd.style.display = 'block';

        const tableDivProd = document.getElementById("divProdTabla");
        tableDivProd.style.display = 'none';

        // Crear botón de Actualizar
        const btnActualizar = document.createElement('button');
        btnActualizar.setAttribute('id', 'btnActualizar');
        btnActualizar.setAttribute('type', 'button');
        btnActualizar.style.display = 'none';
        btnActualizar.textContent = 'Actualizar';

        // Crear botón de Cancelar
        const btnCancelar = document.createElement('button');
        btnCancelar.setAttribute('id', 'btnCancelar');
        btnCancelar.setAttribute('type', 'button');
        btnCancelar.style.display = 'none';
        btnCancelar.textContent = 'Cancelar';

        // Agregar los botones al formulario de edición
        formProd.appendChild(btnActualizar);
        formProd.appendChild(btnCancelar);

        // Asignar funciones a los botones de Actualizar y Cancelar
        btnActualizar.onclick = function () {
            updateProduct(id);
        };

        btnCancelar.onclick = function () {
            formProd.reset(); // Reiniciar el formulario
            formProd.style.display = 'none'; // Ocultar el formulario
            tableDivProd.style.display = 'block'; // Mostrar la tabla de productos
            btnActualizar.style.display = 'none'; // Ocultar botón de Actualizar
            btnCancelar.style.display = 'none'; // Ocultar botón de Cancelar
        };

        // Mostrar los botones

        btnActualizar.style.display = 'inline-block';
        btnCancelar.style.display = 'inline-block';

    })
    .catch(error => {
        console.error('Error al obtener los datos del producto:', error);
    });

}

function updateProduct(id) {
    const url = 'http://localhost:8080/productos/update';

    const nombreProducto = document.querySelector('#nombreProd').value;

    const imagenInput = document.querySelector('#imagen');
    let base64Image = null;
    if (imagenInput.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(imagenInput.files[0]);
        reader.onload = function () {
            base64Image = reader.result;
            enviarSolicitud(); // Enviar la solicitud después de convertir la imagen
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    } else {
        enviarSolicitud(); // Enviar la solicitud inmediatamente si no hay imagen
    }

    function enviarSolicitud() {
        const categoriaSeleccionada = document.querySelector('input[name="tipo"]:checked');
        const categoria = categoriaSeleccionada ? parseInt(categoriaSeleccionada.value) : null;

        const data = {
            idProducto: id,
            nombreProducto: nombreProducto,
            imagen: base64Image,
            categoria: categoria
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            alert('Producto actualizado exitosamente');
            formProd.style.display = 'none';
            tableDivProd.style.display = 'block';
            document.getElementById('listProd').click();
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
    }
}
