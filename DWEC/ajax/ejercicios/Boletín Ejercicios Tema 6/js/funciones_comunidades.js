addEventListener("load", inicializarEventosComunidades, false);

function inicializarEventosComunidades() {
  let desplegableComunidades = document.getElementById("comunidades");
  desplegableComunidades.addEventListener("focus", cargarComunidades, false);

  desplegableComunidades.addEventListener("change", cargarProvincias, false);
}

let conexion1;

function cargarComunidades() {
  conexion1 = new XMLHttpRequest();
  conexion1.open("GET", "../services/cargar_comunidades_autonomas.php", true);
  conexion1.addEventListener("readystatechange", procesarDatosComunidades, false);
  conexion1.addEventListener("timeout", tiempoVencido, false);
  conexion1.timeout = 3000;
  conexion1.send();
}

function procesarDatosComunidades() {
  if (conexion1.readyState == 4 && conexion1.status == 200) {
    try {
      let datos = JSON.parse(conexion1.responseText);
      let selectComunidades = document.getElementById("comunidades");
      selectComunidades.innerHTML = '<option value="">Seleccionar...</option>';
      datos.forEach((comunidad) => {
        let option = document.createElement("option");
        option.value = comunidad.id;
        option.textContent = comunidad.nombre;
        selectComunidades.appendChild(option);
      });
    } catch (ex) {
      console.log(ex.message);
      alert("Error al parsear los datos JSON: " + ex.message);
z
    }
  }
}

function tiempoVencido() {
  alert("El tiempo de espera del servidor ha vencido.");
}
