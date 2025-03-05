<?php
class VisitasSecciones {
    public int $id;
    public string $seccion;
    public int $visitas;

    function __construct($id, $seccion, $visitas) {
        $this->id = $id;
        $this->seccion = $seccion;
        $this->visitas = $visitas;
    }

    public function getId() {
        return $this->id;
    }

    public function getSeccion() {
        return $this->seccion;
    }

    public function getVisitas() {
        return $this->visitas;
    }
}
?>
