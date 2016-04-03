<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	require_once('class/Permissao.class.php');
	$device=$_GET['device'];
	
	$premissao=new Permissao;

	echo $permissao->verificarPermissao($device);

?>