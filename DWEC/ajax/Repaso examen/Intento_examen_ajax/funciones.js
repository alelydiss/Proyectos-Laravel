addEventListener("load", inicializarEventos, false);

function inicializarEventos() {
    let desplegableLocalidades = document.getElementById("localidades");
    desplegableLocalidades.addEventListener("focus", cargarLocalidades, false);
    desplegableLocalidades.addEventListener("change", cargarPrevision, false);
  }

let conexion1;

function cargarLocalidades() {
  conexion1 = new XMLHttpRequest();
  conexion1.open("GET", "cargar_localidades.php", true);
  conexion1.addEventListener("readystatechange", procesarDatosLocalidades, false);
  conexion1.addEventListener("timeout", tiempoVencido, false);
  conexion1.timeout = 3000;
  conexion1.send();
}

let conexion2;

function cargarPrevision() {
    let selectLocalidades = document.getElementById("localidades");
    let idlocalidad = selectLocalidades.value;

    if (!idlocalidad) {
        return;
    }
    conexion2 = new XMLHttpRequest();
    conexion2.open("GET", `cargar_prevision.php?idlocalidad=${idlocalidad}`, true);
    conexion2.addEventListener("readystatechange", procesarDatosPrevisiones, false);
    conexion2.addEventListener("timeout", tiempoVencido, false);
    conexion2.timeout = 3000;
    conexion2.send();
}

function tiempoVencido() {
    alert("El tiempo de espera del servidor ha vencido.");
  }
  

function procesarDatosLocalidades() {
  if (conexion1.readyState == 4 && conexion1.status == 200) {
    try {
      let datos = JSON.parse(conexion1.responseText);
      let selectLocalidades = document.getElementById("localidades");
      selectLocalidades.innerHTML = '<option value="">Seleccionar...</option>';
      datos.forEach((genero) => {
        let option = document.createElement("option");
        option.value = genero.nombre;
        option.textContent = genero.nombre;
        selectLocalidades.appendChild(option);
      });
      
    } catch (ex) {
      console.log(ex.message);
      alert("Error al parsear los datos JSON: " + ex.message);
    }
  }
}

function cargando() {
    let cargando = document.getElementById("espera");
    cargando.innerHTML = '<img src="cargando.gif" width="25" height="25">';
}

function procesarDatosPrevisiones() {
    if (conexion2.readyState == 4 && conexion2.status == 200) {
        try {
            let xmlDoc = conexion2.responseXML;
            let previsiones = xmlDoc.getElementsByTagName("prevision");
            let tablaPrevisiones = document.getElementById("tablaprevision");

            tablaPrevisiones.innerHTML = "";

            let thead = document.createElement("thead");
                thead.innerHTML = `
                    <tr>
                        <th>Nombre</th>
                        <th>Hora</th>
                        <th>Temperatura</th>
                        <th>Viento</th>
                        <th>Velocidad</th>
                        <th>Lluvias</th>
                    </tr>`;
                tablaPrevisiones.appendChild(thead);
    
            let tbody = document.createElement("tbody");
            tablaPrevisiones.appendChild(tbody);

            for (let i = 0; i < previsiones.length; i++) {
                let row = document.createElement("tr");

                let nombre = previsiones[i].getElementsByTagName("nombre")[0].textContent;
                let hora = previsiones[i].getElementsByTagName("hora")[0].textContent;
                let temperatura = previsiones[i].getElementsByTagName("temperatura")[0].textContent;
                let icono = previsiones[i].getElementsByTagName("icono")[0].textContent;
                let viento = previsiones[i].getElementsByTagName("viento")[0].textContent;
                let velocidad = previsiones[i].getElementsByTagName("velocidad")[0].textContent;
                let lluvias = previsiones[i].getElementsByTagName("lluvias")[0].textContent;

                row.innerHTML = `
                <td>${nombre}</td>
                <td>${hora}</td>
                <td>${temperatura}<img src="imagenes/${icono}.png" alt="${icono}"></td>
                <td><img src="imagenes/${viento}.png" alt="${viento}"></td>
                <td>${velocidad}</td>
                <td>${lluvias}</td>
            `;

                tbody.appendChild(row);
            }
        } catch (ex) {
            alert("Error al procesar los datos XML: " + ex.message);
        }
    }
}
