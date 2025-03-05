<?php
require_once 'config.php';
require_once 'localidades.php';

sleep(2);

try {    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_localidades=[];

$consulta = $conexion->query("SELECT id,nombre FROM localidades");
while ($reg = $consulta->fetchObject()) {
  $vec_localidades[] = new Localidades($reg->id,$reg->nombre);
}

header('Content-Type: application/json; charset=utf-8');
print json_encode($vec_localidades);

?>

