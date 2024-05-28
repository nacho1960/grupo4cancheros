window.addEventListener('load', function () {
    const buttonAddCat = document.getElementById('addCat');
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCat = document.getElementById("divCatTabla");
    const response = document.getElementById("response");
    const formEditProd = document.getElementById('formEditProd');
    const tableDivUser = document.getElementById("divUser");
    
    buttonAddCat.addEventListener('click', function () {
        formProd.style.display = 'none';
        formCat.style.display = 'block';
        tableDivProd.style.display = 'none';
        tableDivCat.style.display = 'none';
        response.style.display = 'none';
        formEditProd.style.display = 'none';
        tableDivUser.style.display = 'none';
    });

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formCat.addEventListener('submit', function (event) {
        event.preventDefault();

        //Creamos un JSON que tendrá los datos de la nueva categoría
        const formData = {
            nombre: document.querySelector('#nombreCat').value,
            descripcion: document.querySelector('#descripcion').value,
            precioHora: parseFloat(document.querySelector('#precio').value)
        }

        console.log(formData);

        //Invocamos utilizando la función fetch la API Cancheros con el método POST que guardará a la nueva categoría que enviaremos en formato JSON
        const url = "http://localhost:8080/categorias/new";
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    throw new Error('Error al agregar la categoría.');
                }
            })
            .then(data => {
                    let successAlert = '<p>Categoría agregada correctamente</p>'
                    document.querySelector('#response').innerHTML = successAlert;
                    document.querySelector('#response').style.display = 'block';
                    console.log(data);
            })
            .catch(error => {
                let errorAlert = '<p> Error al agregar la categoría.</p>'
                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";
                console.log(error);
            })
            formCat.reset()
    })

});