window.addEventListener('load', function () {
    const buttonAddCat = document.getElementById('addCat');
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCat = document.getElementById("divCatTabla");

    buttonAddCat.addEventListener('click', function () {
        formProd.style.display = 'none';
        formCat.style.display = 'block';
        tableDivProd.style.display = 'none';
        tableDivCat.style.display = 'none';
    });

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formCat.addEventListener('submit', function (event) {
        event.preventDefault();
        //Creamos un JSON que tendrá los datos de la nueva categoría
        const formData = {
            nombre: document.querySelector('#nombreCat').value,
            descripcion: document.querySelector('#descripcion').value,
            precio: document.querySelector('#precio').value
        }

        console.log(formData);

        formCat.reset()
    })

    /*Invocamos utilizando la función fetch la API Cancheros con el método POST que guardará a la nueva categoría que enviaremos en formato JSON
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
                //Sin errores
                let successAlert = <p> Categoría agregada correctamente </p>'
 
                console.log(successAlert);
 
                document.querySelector('#response').innerHTML = successAlert;
                document.querySelector('#response').style.display = 'block';
                formCat.reset()
 
            })
            .catch(error => {
                //Lógica para consultar al Back si ya existe una categoría con ese nombre.
                
                //Formulario con nombre de categoría repetido. 
                let errorAlert = <p> Error al agregar la categoría: ya existe una categoría con ese nombre</p>
 
 
                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";
        
                formCat.reset()
            })
    });*/
});