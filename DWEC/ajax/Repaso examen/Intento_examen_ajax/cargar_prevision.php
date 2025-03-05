<?php
require_once 'config.php';
require_once 'prevision.php';

sleep(2);

try {
    $conexion = new PDO("mysql:host=$db_host;dbname=$db_nombre;charset=$db_charset", $db_usuario, $db_contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die ("Error en la conexión: " . $e->getMessage());
}

$vec_prevision = [];

if(isset($_REQUEST['idlocalidad'])) {
    $idlocalidad = $_REQUEST['idlocalidad'];
    $consulta = $conexion->query("SELECT p.idlocalidad, p.hora, p.temperatura, p.icono, p.viento, p.velocidad, p.lluvias, l.nombre FROM prevision p JOIN localidades l ON p.idlocalidad = l.id WHERE p.idlocalidad = $idlocalidad");

    while ($reg = $consulta->fetchObject()) {
        $vec_prevision[] = $reg;
    }

    $xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n".
              "<previsiones></previsiones>";
    $xml = new SimpleXMLElement($xmlstr);

foreach ($vec_prevision as $prevision) {
    $item = $xml->addChild('prevision');
    $item->addChild('idlocalidad', $prevision->idlocalidad);
    $item->addChild('hora', $prevision->hora);
    $item->addChild('temperatura', $prevision->temperatura);
    $item->addChild('icono', $prevision->icono);
    $item->addChild('viento', $prevision->viento);
    $item->addChild('velocidad', $prevision->velocidad);
    $item->addChild('lluvias', $prevision->lluvias);
    $item->addChild('nombre', $prevision->nombre);
}

header('Content-Type: application/xml; charset=utf-8');
print $xml->asXML();
} else {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Parametro idlocalidad requerido']);
}

?>
