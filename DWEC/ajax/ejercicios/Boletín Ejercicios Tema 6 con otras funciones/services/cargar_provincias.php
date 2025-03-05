<?php
require_once '../includes/config.php';
require_once '../includes/Provincias.php';

sleep(1);

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_provincias = [];


    if (isset($_GET['comunidad_id'])) {
        $comunidad_id = $_GET['comunidad_id'];
        $consulta = $conexion->prepare("SELECT id, nombre FROM provincias WHERE comunidad = ?");
        $consulta->execute([$comunidad_id]);
    } else {
        $consulta = $conexion->prepare("SELECT id, nombre FROM provincias");
        $consulta->execute();
    }



while ($reg = $consulta->fetchObject()) {
    $vec_provincias[] = new Provincias($reg->id, $reg->nombre);
}


$xmlstr ="<?xml version='1.0' encoding='UTF-8'?>\n".

"<provincias></provincias>";
$xml = new SimpleXMLElement($xmlstr);

foreach ($vec_provincias as $provincias) {
    $item = $xml->addChild('provincia');
    $item->addChild('id', $provincias->id);
    $item->addChild('nombre', $provincias->nombre);
}

header('Content-Type: application/xml; charset=utf-8');
print $xml->asXML();

?>