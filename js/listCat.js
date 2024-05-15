window.addEventListener('load', function () {
    const botonListar = document.getElementById('listCat');
    const tableDivCat = document.getElementById("divCatTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivProd = document.getElementById("divProdTabla");
    const response = document.getElementById("response")

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    response.style.display = 'none';

    botonListar.addEventListener('click', function () {
        tableDivCat.style.display = 'block';
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        tableDivProd.style.display = 'none';
        response.style.display = 'none';

        //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de categorías
        const url = 'http://localhost:8080/categorias/listarTodos';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById("catTablaBody");
                table.innerHTML = '';

                //Recorremos la colección de categorias del JSON:
                data.forEach(categoria => {
                    //Por cada categoria armaremos una fila de la tabla:
                    let categoriaRow = table.insertRow();
                    let tr_id = 'tr_' + categoria.idCategoria;
                    categoriaRow.id = tr_id;

                    // Añadimos las celdas con los datos de la categoría
                    let idCelda = categoriaRow.insertCell();
                    idCelda.textContent = categoria.idCategoria;

                    let nombreCelda = categoriaRow.insertCell();
                    nombreCelda.textContent = categoria.nombre;

                    let descripcionCelda = categoriaRow.insertCell();
                    descripcionCelda.textContent = categoria.descripcion;

                    let precioCelda = categoriaRow.insertCell();
                    precioCelda.textContent = categoria.precioHora;
                });
                tableDivCat.style.display = 'block';
                console.log(data);
            });

    });

});