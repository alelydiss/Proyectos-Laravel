<?php
require_once 'config.php';
require_once 'films.php';

sleep(2);

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_films = [];

if(isset($_REQUEST['CodiDirec'])) {
    $CodiDirec = $_REQUEST['CodiDirec'];
    $consulta = $conexion->query("SELECT Titulo, Año, Productora FROM films WHERE Director = $CodiDirec");

    while ($reg = $consulta->fetchObject()) {
        $vec_films[] = new Films($reg->Titulo, $reg->Año, $reg->Productora);
    }

    $xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n".
              "<films></films>";
    $xml = new SimpleXMLElement($xmlstr);

foreach ($vec_films as $film) {
    $item = $xml->addChild('film');
    $item->addChild('Titulo', $film->getTitulo());
    $item->addChild('Año', $film->getAño());
    $item->addChild('Productora', $film->getProductora());
}

header('Content-Type: application/xml; charset=utf-8');
print $xml->asXML();
} else {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Parametro idlocalidad requerido']);
}

?>
