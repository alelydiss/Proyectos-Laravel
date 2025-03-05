addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
  var ref=document.getElementById('formulario');
  ref.addEventListener('submit',enviarDatos,false);
}

function enviarDatos(e)
{
  e.preventDefault();
  enviarFormulario();
}

var conexion1;
function enviarFormulario() 
{
  conexion1=new XMLHttpRequest();
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open('POST','pagina1.php', true);
  conexion1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  var nom=document.getElementById('nombre').value;
  var com=document.getElementById('comentarios').value;
  conexion1.send(cad='nombre='+encodeURIComponent(nom)+'&comentarios='+encodeURIComponent(com));  
}

function procesarEventos(evt)
{
  var resultados = document.getElementById("resultados");
  if(conexion1.readyState == 4 && conexion1.status == 200)
  {
    resultados.innerHTML = evt.target.responseText;
  } 
  else 
  {
    resultados.innerHTML = 'Procesando...';
  }
}