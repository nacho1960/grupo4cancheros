window.addEventListener('load', function () {
    const nombreUser = document.getElementById("nombreUser")
    const apellidoUser = document.getElementById("apellidoUser")
    const emailUser = document.getElementById("emailUser")

    const url = 'http://localhost:8080/user/detail';
    const settings = {
        method: 'GET'
    }

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            nombreUser.textContent = data.nombre;
            apellidoUser.textContent = data.apellido;
            emailUser.textContent = data.email;
        })
})





































