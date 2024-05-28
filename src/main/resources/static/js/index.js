window.addEventListener('load', function () {
    const divCategoria = document.getElementById('viewCategorias');
    const selectCat = document.getElementById('categoria');

    //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de categorías
    const url = 'http://localhost:8080/categorias/listarTodos';
    const settings = {
        method: 'GET'
    }

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            
            //Recorremos la colección de categorias del JSON y creamos un botón por cada categoría y agregamos option al select de categorias:
            data.forEach(categoria => {
                const buttonCat = document.createElement("button");
                buttonCat.textContent = categoria.nombre;
                buttonCat.classList.add('categoria-button');
                divCategoria.appendChild(buttonCat);

                const optionCat = document.createElement("option");
                optionCat.value = categoria.idCategoria;
                optionCat.textContent = categoria.nombre;
                selectCat.appendChild(optionCat);
                
            });
            console.log(data);
        });

});



