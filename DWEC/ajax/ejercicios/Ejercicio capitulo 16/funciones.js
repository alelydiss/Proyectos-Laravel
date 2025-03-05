addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
  var vec=document.getElementsByTagName('div');
  for(f=0;f<vec.length;f++)
  {
    vec[f].addEventListener('mouseover',mostrarToolTip,false);
    vec[f].addEventListener('mouseout',ocultarToolTip,false);
    vec[f].addEventListener('mousemove',actualizarToolTip,false);
  }
  var ele=document.createElement('div');
  ele.setAttribute('id','divmensaje');
  vec=document.getElementsByTagName('body');
  vec[0].appendChild(ele);

}

function mostrarToolTip(e) {

  var d = document.getElementById("divmensaje");
  d.style.visibility = "visible";
  d.style.left = (e.clientX + document.body.scrollLeft + 15)+'px';
  d.style.top = (e.clientY + document.body.scrollTop + 15)+'px';
  var ref;
  ref=e.target;
  recuperarServidorTooltip(ref.getAttribute('id'));
}

function actualizarToolTip(e) 
{
  var d = document.getElementById("divmensaje");
  d.style.left = (e.clientX + document.body.scrollLeft + 15)+'px';
  d.style.top = (e.clientY + document.body.scrollTop + 15)+'px';
}


function ocultarToolTip(e) 
{
  var d = document.getElementById("divmensaje");
  d.style.visibility = "hidden";
}

var conexion1;
function recuperarServidorTooltip(codigo) {

  conexion1=new XMLHttpRequest();
  conexion1.onreadystatechange = procesarDatos;
  conexion1.open('GET',`cargar_partes.php?id=${codigo}`, true);
  conexion1.send();
}

function procesarEventos()
{
  var d = document.getElementById("divmensaje");
  d.style.visibility = "visible";
  if(conexion1.readyState == 4)
  {
    d.innerHTML=conexion1.responseText;
  }
  else
  {
    d.innerHTML = '<img src="../cargando.gif">';
  }
}

function procesarDatos() {
	if(conexion1.readyState==4){
		if (conexion1.status == 200) {
        var d = document.getElementById("divmensaje");
        d.style.visibility = "visible";
        try {
          let xmlDoc = conexion1.responseXML; // En la propiedad responseXML se almacena el XML (tiene una estructura similar al DOM)
          let salida = '';

          // Obtener todos los elementos <periferico> dentro del XML
          let partes = xmlDoc.getElementsByTagName("parte");


            for (let f = 0; f < partes.length; f++) {
                let nombre = partes[f].getElementsByTagName("nombre")[0].textContent;
                let descripcion = partes[f].getElementsByTagName("descripcion")[0].textContent;
                let imagen = partes[f].getElementsByTagName("imagen")[0].textContent;

                salida += 'Nombre: ' + nombre + "<br>";
                salida += 'Descripcion: ' + descripcion + "<br>";
                salida += '<img src="' + imagen + '" width="100" height="100" style="float:left; margin-right:10px;">';
            }
            d.innerHTML = salida;
        } catch (ex) {
            document.getElementById("divmensaje").innerHTML = "Error al cargar extraer del XML: " + ex.message;
        }

    } else {
        document.getElementById("divmensaje").innerHTML = "Error al cargar los datos";
    }
	} else {
		document.getElementById("divmensaje").innerHTML = "Cargando...";
	}
	

}
