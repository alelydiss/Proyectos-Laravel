<?php
require_once 'config.php';
require_once 'Partes.php';

sleep(2);

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_partes = [];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $consulta = $conexion->prepare("SELECT id, nombre, descripcion, imagen FROM partes WHERE id = ?");
    $consulta->execute([$id]);
} else {
    $consulta = $conexion->query("SELECT id, nombre, descripcion, imagen FROM partes");
    $consulta->execute();
}


while ($reg = $consulta->fetchObject()) {
  $vec_partes[] = new Partes($reg->id, $reg->nombre, $reg->descripcion, $reg->imagen);
}


$xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n".
          "<partes></partes>";
$xml = new SimpleXMLElement($xmlstr);

foreach ($vec_partes as $parte) {
    $item = $xml->addChild('parte');
    $item->addChild('id', $parte->id);
    $item->addChild('nombre', $parte->nombre);
    $item->addChild('descripcion', $parte->descripcion);
    $item->addChild('imagen', $parte->imagen);
}

header('Content-Type: application/xml; charset=utf-8');
print $xml->asXML();
?>
