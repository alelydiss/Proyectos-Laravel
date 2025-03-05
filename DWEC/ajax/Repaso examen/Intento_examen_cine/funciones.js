addEventListener("load", inicializarEventos, false);

function inicializarEventos() {
    let desplegableDirectores = document.getElementById("directores");
    desplegableDirectores.addEventListener("focus", cargarDirectores, false);

    let botonBuscar = document.getElementById("btnBuscar");
    botonBuscar.addEventListener("click", cargarPeliculas, false);
    botonBuscar.addEventListener("click", cargando, false);
  }

let conexion1;

function cargarDirectores() {
  conexion1 = new XMLHttpRequest();
  conexion1.open("GET", "cargar_directores.php", true);
  conexion1.addEventListener("readystatechange", procesarDatosDirectores, false);
  conexion1.addEventListener("timeout", tiempoVencido, false);
  conexion1.timeout = 3000;
  conexion1.send();
}

let conexion2;

function cargarPeliculas() {
    let selectDirectores = document.getElementById("directores");
    let CodiDirec = selectDirectores.value;

    if (!CodiDirec) {
        return;
    }
    conexion2 = new XMLHttpRequest();
    conexion2.open("GET", `cargar_films.php?CodiDirec=${CodiDirec}`, true);
    conexion2.addEventListener("readystatechange", procesarDatosPeliculas, false);
    conexion2.addEventListener("timeout", tiempoVencido, false);
    conexion2.timeout = 3000;
    conexion2.send();
}

function tiempoVencido() {
    alert("El tiempo de espera del servidor ha vencido.");
  }
  

function procesarDatosDirectores() {
  if (conexion1.readyState == 4 && conexion1.status == 200) {
    try {
      let datos = JSON.parse(conexion1.responseText);
      let selectDirectores = document.getElementById("directores");
      selectDirectores.innerHTML = "";
      datos.forEach((directores) => {
        let option = document.createElement("option");
        option.value = directores.CodiDirec;
        option.textContent = directores.Nombre;
        selectDirectores.appendChild(option);
      });
      
    } catch (ex) {
      console.log(ex.message);
      alert("Error al parsear los datos JSON: " + ex.message);
    }
  }
}

function cargando() {
    let cargando = document.getElementById("peliculas");
    cargando.innerHTML = "Cargando...";
}

function procesarDatosPeliculas() {
  if (conexion2.readyState == 4 && conexion2.status == 200) {
      try {
          let xmlDoc = conexion2.responseXML;
          let film = xmlDoc.getElementsByTagName("film");
          let tablaPeliculas = document.getElementById("peliculas");

          tablaPeliculas.innerHTML = "";

          let thead = document.createElement("thead");
                thead.innerHTML = `
                    <tr>
                        <th>Titulo</th>
                        <th>Año</th>
                        <th>Productora</th>
                    </tr>`;
                tablaPeliculas.appendChild(thead);
  
          let tbody = document.createElement("tbody");
          tablaPeliculas.appendChild(tbody);

          for (let i = 0; i < film.length; i++) {
              let row = document.createElement("tr");

              let Titulo = film[i].getElementsByTagName("Titulo")[0].textContent;
              let Año = film[i].getElementsByTagName("Año")[0].textContent;
              let Productora = film[i].getElementsByTagName("Productora")[0].textContent;

              row.innerHTML = `
              <td>${Titulo}</td>
              <td>${Año}</td>
              <td>${Productora}</td>
          `;

              tbody.appendChild(row);
          }
      } catch (ex) {
          alert("Error al procesar los datos XML: " + ex.message);
      }
  }
}
