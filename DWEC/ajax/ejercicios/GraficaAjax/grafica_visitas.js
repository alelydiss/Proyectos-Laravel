addEventListener("load", inicializarGrafica, false);

function inicializarGrafica() {
    cargarDatosVisitas();
}

let conexion;

function cargarDatosVisitas() {
    conexion = new XMLHttpRequest();
    conexion.open("GET", "cargar_visitas.php", true);
    conexion.addEventListener("readystatechange", procesarDatosVisitas, false);
    conexion.timeout = 3000;
    conexion.send();
}

function procesarDatosVisitas() {
    if (conexion.readyState == 4 && conexion.status == 200) {
        try {
            let datos = JSON.parse(conexion.responseText);
            let secciones = datos.map(dato => dato.seccion);
            let visitas = datos.map(dato => dato.visitas);

            dibujarGrafica(secciones, visitas);
        } catch (ex) {
            alert("Error al procesar los datos: " + ex.message);
        }
    }
}

function dibujarGrafica(secciones, visitas) {
    let ctx = document.getElementById("visitasPolarChart").getContext("2d");
    new Chart(ctx, {
        type: "polarArea",
        data: {
            labels: secciones,
            datasets: [{
                label: "Cantidad de Visitas",
                data: visitas,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}
