<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');

	require_once('class/Palitagens.class.php');
	$filtros=$_POST['filtros'];
	$palitagens=new Palitagens($filtros);
	echo $palitagens->info();
?>