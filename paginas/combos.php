<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
require_once('class/Combos.class.php');


$campoDestino=$_POST['campoDestino'];
$msg=$_POST['msg'];
if(isset($_POST['filtros'])){
	$filtros=$_POST['filtros'];
}else{
	$filtros='';
}

$combos=new Combos($filtros);
//echo $campoOrigem.$campoDestino.$valorOrigem.$msg; exit();
$html='<div class="col-xs-12">';
$html.=$combos->getHtmlCombo($campoDestino,$msg);
$html.='</div>';
echo $html;
?>