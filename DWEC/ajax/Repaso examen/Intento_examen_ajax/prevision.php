<?php
class Prevision {

	public int $id;
	public string $fecha;
	public string $temperatura;
	public string $icono;
	public string $viento;
	public string $velocidad;
	public string $lluvias;
	public int $idlocalidad;


	function __construct($id, $fecha, $temperatura, $icono, $viento, $velocidad, $lluvias, $idlocalidad)
	{
		$this->id = $id;
		$this->fecha = $fecha;
		$this->temperatura = $temperatura;
		$this->icono = $icono;
		$this->viento = $viento;
		$this->velocidad = $velocidad;
		$this->lluvias = $lluvias;
		$this->idlocalidad = $idlocalidad;
	}

	public function getId()
	{
		return $this->id;
	}

	public function getFecha()
	{
		return $this->fecha;
	}

	public function getTemperatura()
	{
		return $this->temperatura;
	}

	public function getIcono()
	{
		return $this->icono;
	}

	public function getViento()
	{
		return $this->viento;
	}

	public function getVelocidad()
	{
		return $this->velocidad;
	}

	public function getLluvias()
	{
		return $this->lluvias;
	}

	public function getIdLocalidad()
	{
		return $this->idlocalidad;
	}
}
