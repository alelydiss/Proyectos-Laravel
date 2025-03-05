<?php
class Films { 

public int $CodPel;
public string $Titulo;
public string $Año;
public string $Nacionalidad;
public float $Duracion;
public DateTime $FechaEstreno;
public string $Genero;
public float $Taquilla;
public string $Productora;
public string $Distribuidora;
public int $Director;

function __construct($Titulo, $Año, $Productora) {
	$this->Titulo = $Titulo;
	$this->Año = $Año;
	$this->Productora = $Productora;
}

public function getCodPel() {
	return $this->CodPel;
}

public function getTitulo() {
	return $this->Titulo;
}

public function getAño() {
	return $this->Año;
}

public function getNacionalidad() {
	return $this->Nacionalidad;
}

public function getDuracion() {
	return $this->Duracion;
}

public function getFechaEstreno() {
	return $this->FechaEstreno;
}

public function getGenero() {
	return $this->Genero;
}

public function getTaquilla() {
	return $this->Taquilla;
}

public function getProductora() {
	return $this->Productora;
}

public function getDistribuidora() {
	return $this->Distribuidora;
}

public function getDirector() {
	return $this->Director;
}

}
