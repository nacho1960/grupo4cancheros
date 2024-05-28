window.addEventListener('load', function () {
    const navbarUser = document.getElementById("navbarUser");
    const contentLoginAndRegister = document.getElementById("contentLoginAndRegister");
    const adminPanel = document.getElementById("adminPanel");
    const avatar = document.getElementById("user-avatar");

    avatar.addEventListener('click', function () {
        if (navbarUser.style.display === "none") {
            navbarUser.style.display = "block";
          } else {
            navbarUser.style.display = "none";
          }
    })

    const url = 'http://localhost:8080/user/authenticated';
    const settings = {
        method: 'GET'
    }

    fetch(url, settings)
        .then(response => response.text())
        .then(data => {
            // Manejar diferentes roles
            if (data === 'ROLE_ADMIN') {
                avatar.style.display = "block";
                navbarUser.style.display = "none"
                adminPanel.style.display = "block";
                contentLoginAndRegister.style.display = "none"
            } else if (data === 'ROLE_USER') {
                avatar.style.display = "block";
                navbarUser.style.display = "none"
                adminPanel.style.display = "none"
                contentLoginAndRegister.style.display = "none"
            } else {
                avatar.style.display = "none";
                navbarUser.style.display = "none"
                adminPanel.style.display = "none"
                contentLoginAndRegister.style.display = "block"
            }
        })

    const urlDetails = 'http://localhost:8080/user/detail';
    const settingsDetails = {
        method: 'GET'
    }

    fetch(urlDetails, settingsDetails)
        .then(response => {
            // Comprobar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        })
        .then(data => {
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                if ('nombre' in data && 'apellido' in data) {
                    let avatarText = data.nombre.charAt(0) + data.apellido.charAt(0);
                    avatar.textContent = avatarText;
                }
            }
        })
})


