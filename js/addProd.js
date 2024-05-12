window.addEventListener('load', function () {
    const buttonAddProduct = document.getElementById('addProd');
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    var radioCat = document.getElementById('radioCat');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCat = document.getElementById("divCatTabla");
    
    formProd.style.display = 'none';
    formCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    tableDivCat.style.display = 'none';

    buttonAddProduct.addEventListener('click', function () {
        formProd.style.display = 'block';
        formCat.style.display = 'none';
        tableDivProd.style.display = 'none';
        tableDivCat.style.display = 'none';
    });

    //Obtener las categorias desde la API
    const categorias = ["Fútbol", "Handball", "Basket", "Tenis"];

    //Por cada categoría crea un radio
    categorias.forEach(function (categoria) {
        var radioLabel = document.createElement("label");
        var radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.value = categoria;
        radioInput.name = "tipo";
        radioLabel.appendChild(radioInput);
        radioLabel.style.marginRight = "10px";
        radioLabel.appendChild(document.createTextNode(categoria));
        radioCat.appendChild(radioLabel);
    });

    //Ante un submit del formulario se ejecutará la siguiente función
    formProd.addEventListener('submit', function (event) {
        event.preventDefault();
        //Creamos un JSON que tendrá los datos del nuevo producto
        const formData = {
            nombre: document.querySelector('#nombreProd').value,
            categoria: document.querySelector('input[name="tipo"]:checked').value,
            imagen: document.querySelector('#imagen')
        };

        console.log(formData);
        
        formProd.reset()

    })

    

    /* Invocamos utilizando la función fetch la API Cacheros con el método POST que guardará al producto que enviaremos en formato JSON
    const url = ;
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }
 
    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            let successAlert = <p> Producto agregado correctamente. </p>
 
            console.log(successAlert);
 
            document.querySelector('#response').innerHTML = successAlert;
            document.querySelector('#response').style.display = 'block';
            formProd.reset()
 
        })
        .catch(error => {
            //Lógica para consultar al back si el nombre del producto esta repetido. 
            //Si el nombre esta repetido. 
            let errorAlert = <p> Error al agregar el producto: ya existe un producto con ese nombre.</p>
 
            document.querySelector('#response').innerHTML = errorAlert;
            document.querySelector('#response').style.display = "block";

            formProd.reset()
        })*/

})





