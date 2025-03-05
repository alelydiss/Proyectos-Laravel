addEventListener("load", inicializarEventos, false);

function inicializarEventos() {
    let desplegableGeneros = document.getElementById("inputGenero");
    desplegableGeneros.addEventListener("focus", cargarGeneros, false);
    desplegableGeneros.addEventListener("change", cargarPeliculas, false)
  }

  //cargar generos
let conexion1;

function cargarGeneros() {
  conexion1 = new XMLHttpRequest();
  conexion1.open("GET", "cargar_generos_json.php", true);
  conexion1.addEventListener("readystatechange", procesarDatosGeneros, false);
  conexion1.addEventListener("timeout", tiempoVencido, false);
  conexion1.timeout = 3000;
  conexion1.send();
}

//cargar peliculas
let conexion2;

function cargarPeliculas() {
    let selectGeneros = document.getElementById("inputGenero");
    let genero = selectGeneros.value;

    conexion2 = new XMLHttpRequest();
    if(genero) {
      conexion2.open("GET", `cargar_peliculas_xml.php?genero=${genero}`, true);
    } else {
      conexion2.open("GET", `cargar_peliculas_xml.php`, true);
    }
    conexion2.addEventListener("readystatechange", procesarDatosPeliculas, false);
    conexion2.addEventListener("timeout", tiempoVencido, false);
    conexion2.timeout = 3000;
    conexion2.send();
}

function tiempoVencido() {
    alert("El tiempo de espera del servidor ha vencido.");
  }
  

function procesarDatosGeneros() {
  if (conexion1.readyState == 4 && conexion1.status == 200) {
    try {
      let datos = JSON.parse(conexion1.responseText);
      let selectGeneros = document.getElementById("inputGenero");
      selectGeneros.innerHTML = '<option value="">Todos</option>';
      datos.forEach((peliculas) => {
        let option = document.createElement("option");
        option.value = peliculas.nombre;
        option.textContent = peliculas.nombre;
        selectGeneros.appendChild(option);
      });
      
    } catch (ex) {
      console.log(ex.message);
      alert("Error al parsear los datos JSON: " + ex.message);
    }
  }
}

function procesarDatosPeliculas() {
    if (conexion2.readyState == 4 && conexion2.status == 200) {
        try {
            let xmlDoc = conexion2.responseXML;
            let peliculas = xmlDoc.getElementsByTagName("pelicula");
            let tablaPeliculas = document.getElementById("inputTabla");

            tablaPeliculas.innerHTML = "";

            for (let i = 0; i < peliculas.length; i++) {
                let row = document.createElement("tr");

                let titulo = peliculas[i].getElementsByTagName("titulo")[0].textContent;
                let anio = peliculas[i].getElementsByTagName("anio")[0].textContent;
                let genero = peliculas[i].getElementsByTagName("genero")[0].textContent;
                let poster = peliculas[i].getElementsByTagName("poster")[0].textContent;
 

                row.innerHTML = `
                <td>${titulo}</td>
                <td>${anio}</td>
                <td>${genero}</td>
                <td><img src="${poster}" alt="${poster}"></td>
                <td><button type="button" id="btn" class="btn btn-warning">Detalles</button></td>
            `;
            tablaPeliculas.appendChild(row);
            }
        } catch (ex) {
            alert("Error al procesar los datos XML: " + ex.message);
        }

        let botonTrama = document.getElementById("btn");
        botonTrama.addEventListener("click", cargarTrama, false);
    }
}

function cargarTrama() {
  if (conexion2.readyState == 4 && conexion2.status == 200) {
    try {
        let xmlDoc = conexion2.responseXML;
        let peliculas = xmlDoc.getElementsByTagName("pelicula");
        
        let ptrama = document.getElementById("inputTrama");
        ptrama.innerHTML = "";
        
        for (let i = 0; i < peliculas.length; i++) {

            let trama = peliculas[i].getElementsByTagName("sinopsis")[0].textContent;

            ptrama.innerHTML = `
            ${trama}
        `;
        }
    } catch (ex) {
        alert("Error al procesar los datos XML: " + ex.message);
    }
}
}