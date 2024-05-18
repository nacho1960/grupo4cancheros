window.addEventListener('load', function () {
    const registrarNuevoUsuario = document.getElementById('registrarNuevoUsuario');
    const formAgregarUsuario = document.getElementById('formAgregarUsuario');
    //const formCat = document.getElementById('formCat');
    //const tableDivProd = document.getElementById("divProdTabla");
    //const tableDivCat = document.getElementById("divCatTabla");
    const response = document.getElementById("response")

    registrarNuevoUsuario.addEventListener('click', function () {
        formAgregarUsuario.style.display = 'none';
        //tableDivProd.style.display = 'none';
        response.style.display = 'none';
    });

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formAgregarUsuario.addEventListener('submit', function (event) {
        event.preventDefault();
        //Creamos un JSON que tendrá los datos del nuevo usuario
        nombreUsuarioNuevo = document.querySelector('#nombreUsuarioNuevo').value.trim(),
        apellidosUsuarioNuevo =document.querySelector('#apellidosUsuarioNuevo').value.trim(),
        correoUsuarioNuevo = document.querySelector('#correoUsuarioNuevo').value.trim(),
        contraseñaUsuarioNuevo = document.querySelector('#contraseñaUsuarioNuevo').value.trim(),
        confirmarContraseñaUsuarioNuevo = document.querySelector('#contraseñaUsuarioNuevo').value.trim()

        // Verificar que todos los campos tengan valor
        if (!nombre || !apellidos || !correo || !contraseña || !confirmarContraseña) {
            response.innerHTML = '<p>Todos los campos son obligatorios.</p>';
            response.style.display = 'block';
            return;
        }

        // Verificar que las contraseñas coincidan
        if (contraseña !== confirmarContraseña) {
            response.innerHTML = '<p>Las contraseñas no coinciden.</p>';
            response.style.display = 'block';
            return;
        }

        // Crear un objeto JSON con los datos del nuevo usuario
        const formData = {
            nombreUsuarioNuevo: nombre,
            apellidosUsuarioNuevo: apellidos,
            correoUsuarioNuevo: correo,
            contraseñaUsuarioNuevo: contraseña
        };

        console.log(formData);

        //Invocamos utilizando la función fetch la API Cancheros con el método POST que guardará a la nueva categoría que enviaremos en formato JSON
        const url = "http://localhost:8080/usuarios/new";
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
                    throw new Error('Error al agregar al nuevo usuario.');
                }
            })
            .then(data => {
                    let successAlert = '<p>Usuario agregado correctamente</p>'
                    document.querySelector('#response').innerHTML = successAlert;
                    document.querySelector('#response').style.display = 'block';
                    console.log(data);
            })
            .catch(error => {
                let errorAlert = '<p> Error al agregar al nuevo usuario.</p>'
                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";
                console.log(error);
            })
            formCat.reset()
    })

});