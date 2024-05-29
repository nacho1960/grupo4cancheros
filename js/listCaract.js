
window.addEventListener('load', function () {
    const botonListar = document.getElementById('listCaract');
    const tableDivCat = document.getElementById("divCatTabla");
    const formProd = document.getElementById('formProd');
    const formCat = document.getElementById('formCat');
    const formCaract = document.getElementById('formCaract');
    const tableDivProd = document.getElementById("divProdTabla");
    const tableDivCaract = document.getElementById("divcaratTabla");

    const response = document.getElementById("response");
    const formEditProd = document.getElementById('formEditProd');

    formProd.style.display = 'none';
    formCat.style.display = 'none';
    formCaract.style.display='none';
    tableDivCat.style.display = 'none';
    tableDivProd.style.display = 'none';
    tableDivCaract.style.display = 'none';
    response.style.display = 'none';
    formEditProd.style.display = 'none';

    botonListar.addEventListener('click', function () {
        tableDivCat.style.display = 'none';
        tableDivCaract.style.display = 'block';
        formProd.style.display = 'none';
        formCat.style.display = 'none';
        formCaract.style.display = 'none';
        tableDivProd.style.display = 'none';
        response.style.display = 'none';
        formEditProd.style.display = 'none';

        //Invocamos a la API de Canhceros con el método GET nos devolverá un JSON con una colección de cate
        const url = 'http://localhost:8080/caracteristica/listarTodos';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById("caractTablaBody");
                table.innerHTML = '';


            // Añadimos las celdas con los datos de la categoría
                   
                 let nombreCelda = caracteristicaRow.insertCell();
                  nombreCelda.textContent = caracteristica.nombre;

data.forEach(caracteristica => {
                    //Por cada caracteristica armaremos una fila de la tabla:
                    let caracteristicaRow = table.insertRow();
                    let tr_id = 'tr_' + caracteristica.idCaracteristica;
                    caracteristicaRow.id = tr_id;

                    let nombreCelda = caracteristicaRow.insertCell();
                    nombreCelda.textContent = caracteristica.nombre;

                  //  let imagenCelda = caracteristicaRow.insertCell();
                  //  imagenCelda.imagen = caracteristica.imagen;

                   //* if (formData.imagen) {
                     //   const reader = new FileReader();
                      //  reader.readAsDataURL(formData.imagen);
                       // reader.onload = function () {
                         //   const base64Image = reader.result;
                           // formData.imagen = base64Image;
                           // console.log(formData);
                            //Invocación a la API
                           // enviarDatos(formData);
                       // };
                       // reader.onerror = function (error) {
                         //   console.log('Error: ', error);
                        //};
                    })

                });

                tableDivCaract.style.display = 'block';
                console.log(data);
            });

    });






