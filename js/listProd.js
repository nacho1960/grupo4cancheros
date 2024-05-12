window.addEventListener('load', function () {
    const botonListar = document.getElementById('listProd');
    const tableDivProd = document.getElementById("divProdTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivCat = document.getElementById("divCatTabla");

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    tableDivCat.style.display = 'none';

    botonListar.addEventListener('click', function () {
        tableDivProd.style.display = 'block';
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        tableDivCat.style.display = 'none';

       /* //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de productos
        const url = 'url';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const tableDiv = document.getElementById("divProdTablA");
                const table = document.getElementById("prodTablABody");
                table.innerHTML = '';

                //Recorremos la colección de productos del JSON:
                for (producto of data) {

                    //Por cada producto armaremos una fila de la tabla:
                    var productoRow = table.insertRow();
                    let tr_id = 'tr_' + producto.id;
                    productoRow.id = tr_id;

                    //Por cada producto creamos un botón delete que agregaremos en cada fila para poder eliminar la misma:
                    let deleteButton = '<button id=' + '\"' + 'btn_delete_' + producto.id + '\"' + ' type="button" onclick="confirmDelete(' + producto.id + ')"> Eliminar </button>';

                    function confirmDelete(id) {
                        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                            eliminarProducto(producto.id)
                        }
                    }
                };
                tableDiv.style.display = 'block';
                tableDiv.style.width = '100%';

            });*/
    });

});