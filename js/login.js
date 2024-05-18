window.addEventListener('load', function () {
    const formIniciarSesion = document.getElementById('formIniciarSesion');
    const response = document.getElementById("response");

    // Validar el formulario al hacer submit
    formIniciarSesion.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const correo = document.querySelector('#correoUsuario').value.trim();
        const contraseña = document.querySelector('#contraseñaUsuario').value.trim();

        // Verificar que todos los campos tengan valor
        if (!correo || !contraseña) {
            response.innerHTML = '<p>Todos los campos son obligatorios.</p>';
            response.style.display = 'block';
            return;
        }

        // Crear un objeto JSON con los datos de inicio de sesión
        const formData = {
            correoUsuario: correo,
            contraseñaUsuario: contraseña
        };

        console.log(formData);

        // Enviar los datos a la API para validación
        const url = "http://localhost:8080/usuarios/login"; 
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
                } else if (response.status == 401) {
                    throw new Error('Credenciales incorrectas.');
                } else {
                    throw new Error('Error al iniciar sesión.');
                }
            })
            .then(data => {
                let successAlert = '<p>Inicio de sesión exitoso</p>';
                document.querySelector('#response').innerHTML = successAlert;
                document.querySelector('#response').style.display = 'block';
                console.log(data);
                window.location.href = 'index.html';
            })
            .catch(error => {
                let errorAlert = `<p>${error.message}</p>`;
                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";
                console.log(error);
            });

        formIniciarSesion.reset();
    });
});
