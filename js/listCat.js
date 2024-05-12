window.addEventListener('load', function () {
    const botonListar = document.getElementById('listCat');
    const tableDivCat = document.getElementById("divCatTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivProd = document.getElementById("divProdTabla");

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivCat.style.display = 'none';
    tableDivProd.style.display = 'none';

    botonListar.addEventListener('click', function () {
        tableDivCat.style.display = 'block';
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        tableDivProd.style.display = 'none';

       /* //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de categorías
        const url = 'url';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const tableDivCat = document.getElementById("divCatTabla");
                const table = document.getElementById("catTablaBody");
                table.innerHTML = '';

                //Recorremos la colección de categorias del JSON:
                for (categoria of data) {

                    //Por cada categoria armaremos una fila de la tabla:
                    var categoriaRow = table.insertRow();
                    let tr_id = 'tr_' + categoria.id;
                    categoriaRow.id = tr_id;

                };
                tableDiv.style.display = 'block';

            });*/
    });

});