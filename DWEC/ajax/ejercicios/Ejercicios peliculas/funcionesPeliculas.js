addEventListener('load', inicializarEventos, false);

        function inicializarEventos() {
            let ob = document.getElementById('buscar');
            ob.addEventListener('click', presionBoton, false);
        }
        
        let conexion1;
        function presionBoton(e) {
            let titulo = document.getElementById('titulo').value;
            let tipo = document.getElementById('tipo').value;
            if (!titulo) {
                alert("Por favor, escribe un titulo");
                return;
              }
            conexion1 = new XMLHttpRequest();
            conexion1.open('GET', `http://www.omdbapi.com/?s=${titulo}&type=${tipo}&apikey=bacb12a5`, true);
            conexion1.timeout = 3000;
            conexion1.addEventListener('readystatechange', procesarDatos);
            conexion1.addEventListener('timeout', tiempoVencido);
            conexion1.send();
        }
        
        
        function tiempoVencido() {
            document.getElementById("resultados").innerHTML = "Tiempo de espera vencido";
        }
        
        function procesarDatos() {
            if(conexion1.readyState==4){
                    if (conexion1.status == 200) {
                let resultados = document.getElementById("resultados");
                try {
                    let salida = '';
                    let datos = JSON.parse(conexion1.responseText);
              
                    salida += '<table border="1">';
                    salida += '<tr><th>Titulo</th><th>Tipo</th><th>Año</th><th>Portada</th></tr>';
                    for (let f = 0; f < datos.Search.length; f++) {
                        salida += '<tr>';
                        salida += '<td>' + datos.Search[f].Title + '</td>';
                        salida += '<td>' + datos.Search[f].Type + '</td>';
                        salida += '<td>' + datos.Search[f].Year + '</td>';
                        salida += '<td><img src="' + datos.Search[f].Poster + '" alt="Poster"></td>';
                        salida += '</tr>';
                    }
                    salida += '</table>';
                    resultados.innerHTML = salida;
                } catch (ex) {
                    document.getElementById("resultados").innerHTML = "Error al cargar parsear el JSON: " + ex.message;
                }
        
            } else {
                document.getElementById("resultados").innerHTML = "Error al cargar los datos";
            }
            } else {
                document.getElementById("resultados").innerHTML = "Cargando...";
            }
            
        
        }