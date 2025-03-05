<?php
class Directores { 

public int $CodiDirec;
public string $Nombre;
public DateTime $FNacimiento;
public string $LNacimiento;
public string $Nacionalidad;
public DateTime $FMuerte;
public string $LMuerte;


function __construct($CodiDirec, $Nombre) {
	$this->CodiDirec = $CodiDirec;
	$this->Nombre = $Nombre;
}

public function getCodiDirec() {
	return $this->CodiDirec;
}

public function getNombre() {
	return $this->Nombre;
}

public function getFNacimiento() {
	return $this->FNacimiento;
}

public function getLNacimiento() {
	return $this->LNacimiento;
}

public function getNacionalidad() {
	return $this->Nacionalidad;
}

public function getFMuerte() {
	return $this->FMuerte;
}

public function getLMuerte() {
	return $this->LMuerte;
}
}
