function provinciasXML2JSON(){
    
    try{

        // Obtener el objeto XML
        let xmlDoc = conexion2.responseXML;

        // Verificar si xmlDoc tiene datos
        if (!xmlDoc) {
            document.getElementById("resultados2").innerHTML = "Error al procesar el XML";
            return;
        }

        // Convertir el XML a JSON
        let provincias = xmlDoc.getElementsByTagName("provincia");

        let datos = [];

        // Recorrer todas las provincias y añadirla al array de datos
        for (let f = 0; f < provincias.length; f++) {
            let id = provincias[f].getElementsByTagName("id")[0].textContent;
            let nombre = provincias[f].getElementsByTagName("nombre")[0].textContent;

            datos.push({id: id, nombre: nombre});
        }

        console.log(datos);

        return datos;

    }catch(ex){
        document.getElementById("resultados2").innerHTML = "Error al parsear el XML: " + ex.message;
    }
}