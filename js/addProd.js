window.addEventListener('load', function () {
    const buttonAddProduct = document.getElementById('addProd');
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    var radioCat = document.getElementById('radioCat');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCat = document.getElementById("divCatTabla");
    const response = document.getElementById("response")

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    tableDivCat.style.display = 'none';
    response.style.display = 'none';

    buttonAddProduct.addEventListener('click', function () {
        formProd.style.display = 'block';
        formCat.style.display = 'none';
        tableDivProd.style.display = 'none';
        tableDivCat.style.display = 'none';
        response.style.display = 'none';
        radioCat.innerHTML = '<h4>Categoría</h4>'

        //Obtener las categorias desde la API
        const url = 'http://localhost:8080/categorias/listarTodos';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                //Recorremos la colección de categorias del JSON:
                data.forEach(categoria => {
                    //Por cada categoría crea un radio
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

                console.log(data);
            });
    });



    //Ante un submit del formulario se ejecutará la siguiente función
    formProd.addEventListener('submit', function (event) {
        event.preventDefault();
        //Creamos un JSON que tendrá los datos del nuevo producto
        const formData = {
            nombreProducto: document.querySelector('#nombreProd').value,
            categoria: {
                idCategoria: parseInt(document.querySelector('input[name="tipo"]:checked').value)
            },
            imagen: document.querySelector('#imagen').files[0]
        };

        // Convertir imagen a base64
        if (formData.imagen) {
            const reader = new FileReader();
            reader.readAsDataURL(formData.imagen);
            reader.onload = function () {
                const base64Image = reader.result;
                formData.imagen = base64Image;
                console.log(formData);
                //Invocación a la API
                enviarDatos(formData);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        formProd.reset()
    })

});


function enviarDatos(formData) {
    const url = 'http://localhost:8080/productos/new';
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    };

    fetch(url, settings)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            let successAlert = '<p> Producto agregado correctamente. </p>';
            console.log(successAlert);
            document.querySelector('#response').innerHTML = successAlert;
            document.querySelector('#response').style.display = 'block';
            console.log(data);

        })
        .catch(error => {
            let errorAlert = '<p> Error al agregar el producto: ya existe un producto con ese nombre.</p>';
            document.querySelector('#response').innerHTML = errorAlert;
            document.querySelector('#response').style.display = "block";
            console.log(error);
        });
}

