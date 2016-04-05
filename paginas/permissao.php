<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	require_once('class/Permissao.class.php');
	$dvc=$_POST['dvc'];
	$permissao=new Permissao;

	echo $permissao->verificarPermissao($dvc);

?>