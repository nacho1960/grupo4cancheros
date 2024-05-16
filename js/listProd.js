window.addEventListener('load', function () {
    const botonListar = document.getElementById('listProd');
    const tableDivProd = document.getElementById("divProdTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivCat = document.getElementById("divCatTabla");
    const response = document.getElementById("response")

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

        //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de productos
        const url = 'http://localhost:8080/productos/listarTodos';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById("prodTablaBody");
                table.innerHTML = '';

                //Recorremos la colección de productos del JSON:
                for (producto of data) {

                    //Por cada producto armaremos una fila de la tabla:
                    var productoRow = table.insertRow();
                    let tr_id = 'tr_' + producto.idProducto;
                    productoRow.id = tr_id;

                    // Añadimos las celdas con los datos del producto
                    let idCelda = productoRow.insertCell();
                    idCelda.textContent = producto.idProducto;

                    let nombreCelda = productoRow.insertCell();
                    nombreCelda.textContent = producto.nombreProducto;

                    let categoriaCelda = productoRow.insertCell();
                    categoriaCelda.textContent = producto.categoria.nombre;

                    //Por cada producto creamos un botón delete que agregaremos en cada fila para poder eliminar la misma:
                    let deleteButton = '<button id=' + '\"' + 'btn_delete_' + producto.idProducto + '\"' + ' type="button" onclick="confirmDelete(' + producto.idProducto + ')"> Eliminar </button>';

                    let borrarCelda = productoRow.insertCell();
                    borrarCelda.innerHTML = deleteButton;

                };
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
            }
            fetch(url, settings)
                .then(response => response.json())

            let row_id = "#tr_" + id;
            document.querySelector(row_id).remove();
        }
}


