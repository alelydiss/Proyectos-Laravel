<?php
require_once '../includes/config.php';
require_once '../includes/Comunidades_autonomas.php';

sleep(1);

try {
  
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_comunidades=[];

$consulta = $conexion->query("SELECT id,nombre FROM comunidades_autonomas");
while ($reg = $consulta->fetchObject()) {
  $vec_comunidades[] = new comunidades_autonomas($reg->id,$reg->nombre);
}

header('Content-Type: application/json; charset=utf-8');
print json_encode($vec_comunidades);

?>