let conexion2;

function cargarProvincias() {
  let selectComunidades = document.getElementById("comunidades");
  let idComunidad = selectComunidades.value;

  if (!idComunidad) {
    alert("Por favor, selecciona una comunidad autónoma.");
    return;
  }

  conexion2 = new XMLHttpRequest();
  conexion2.open("GET", `../services/cargar_provincias.php?comunidad_id=${idComunidad}`, true);
  conexion2.addEventListener("readystatechange", procesarDatosProvincias, false);
  conexion2.addEventListener("timeout", tiempoVencido, false);
  conexion2.timeout = 3000;
  conexion2.addEventListener("error", () => {
    alert("Error al cargar las provincias. Verifica la conexión o los datos del servidor.");
  });
  conexion2.send();
}

function clientesXML2JSON() {
  let xml = conexion2.responseXML;
  let json = xmlToJson(xml);
  console.log(json);
  return json;
}

function procesarDatosProvincias() {
  if (conexion2.readyState == 4 && conexion2.status == 200) {
    try {
      let xmlDoc = conexion2.responseXML;
      let provincias = xmlDoc.getElementsByTagName("provincia");
      let selectProvincias = document.getElementById("provincias");
      selectProvincias.innerHTML = '<option value="">Seleccionar...</option>';

      for (let i = 0; i < provincias.length; i++) {
        let option = document.createElement("option");
        let id = provincias[i].getElementsByTagName("id")[0].textContent;
        let nombre = provincias[i].getElementsByTagName("nombre")[0].textContent;
        option.value = id;
        option.textContent = nombre;
        selectProvincias.appendChild(option);
      }
      selectProvincias.addEventListener("change", mostrarProvinciaSeleccionada, false);

      clientesXML2JSON();
    } catch (ex) {
      alert("Error al procesar los datos XML: " + ex.message);
    }
  }
}

function mostrarProvinciaSeleccionada() {
  let selectProvincias = document.getElementById("provincias");
  let resultadoDiv = document.getElementById("resultado");
  
  let provinciaSeleccionada = selectProvincias.options[selectProvincias.selectedIndex];
  let id = provinciaSeleccionada.value;
  let nombre = provinciaSeleccionada.textContent;

  if (id) {
    resultadoDiv.innerHTML = `ID: ${id} - Nombre: ${nombre}`;
  } else {
    resultadoDiv.innerHTML = "Por favor, selecciona una provincia.";
  }
}

function tiempoVencido() {
  alert("El tiempo de espera del servidor ha vencido.");
}
