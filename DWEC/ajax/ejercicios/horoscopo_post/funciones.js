addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
  for(var f=1;f<=12;f++)
  {
    var ob=document.getElementById('enlace'+f);
    ob.addEventListener('click',presionEnlace,false);
  }
}

function presionEnlace(e)
{
    e.preventDefault();
    var url=e.target.getAttribute('href');
    cargarHoroscopo(url); 
}

var conexion1;
function cargarHoroscopo(url) 
{
  url = url.split('?');
  ruta = url[0];
  query = url[1];

  conexion1=new XMLHttpRequest();  
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open("POST", ruta, true);
  conexion1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion1.send(query);
}

function procesarEventos()
{
  var detalles = document.getElementById("detalles");
  if(conexion1.readyState == 4 && conexion1.status == 200)
  {
    detalles.innerHTML = conexion1.responseText;
  } 
  else 
  {
    detalles.innerHTML = '<img src="cargando.gif" width="25" height="25">';
  }
}
