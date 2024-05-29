window.addEventListener('load', function () {
    const buttonAddCaract = document.getElementById('addCaract');
    const formProd = document.getElementById('formProd');
     const formCat = document.getElementById('formCat');
    const formCaract = document.getElementById('formCaract');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCat = document.getElementById("divCatTabla");
    
    const response = document.getElementById("response");
    const formEditProd = document.getElementById('formEditProd');
    
    
    buttonAddCaract.addEventListener('click', function () {
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        formCaract.style.display = 'block';
        tableDivProd.style.display = 'none';
        tableDivCat.style.display = 'none';
        response.style.display = 'none';
        formEditProd.style.display = 'none';
     
    });

 //Ante un submit del formulario se ejecutará la siguiente funcion
        formCaract.addEventListener('submit', function (event) {
            event.preventDefault();

//Creamos un JSON que tendrá los datos de la nueva categoría
 const formData = {
 nombre: document.querySelector('#nombreCaract').value,
 imagen: document.querySelector('#imagenCaract').value,
  
}
  


const url = "http://localhost:8080/caracteristica/new";
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
        throw new Error('Error al agregar la caracteristica.');
    }
})
.then(data => {
    let successAlert = '<p>Caracteristicas agregada correctamente</p>'
    document.querySelector('#response').innerHTML = successAlert;
    document.querySelector('#response').style.display = 'block';
    console.log(data);
})
.catch(error => {
    let errorAlert = '<p> Error al agregar la caracteristica.</p>'
    document.querySelector('#response').innerHTML = errorAlert;
    document.querySelector('#response').style.display = "block";
    console.log(error);
})

        formCaract.reset()
    })
});