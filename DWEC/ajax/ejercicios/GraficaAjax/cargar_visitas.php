<?php
require_once 'config.php';
require_once 'VisitasSecciones.php';

sleep(1);

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}

$visitas = [];

$consulta = $conexion->query("SELECT id, seccion, visitas FROM visitas_secciones");
while ($reg = $consulta->fetchObject()) {
    $visitas[] = new VisitasSecciones($reg->id, $reg->seccion, $reg->visitas);
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($visitas);
?>
