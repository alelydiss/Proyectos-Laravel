<?php
require_once 'config.php';
require_once 'directores.php';

sleep(2);

try {    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_directores=[];

$consulta = $conexion->query("SELECT CodiDirec,Nombre FROM directores");
while ($reg = $consulta->fetchObject()) {
  $vec_directores[] = new Directores($reg->CodiDirec,$reg->Nombre);
}

header('Content-Type: application/json; charset=utf-8');
print json_encode($vec_directores);

?>

