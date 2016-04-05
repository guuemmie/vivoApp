<?php
class conexao{
	public function runSQL($sqlstr){
		$cn=mysqli_connect('appdavivo.mysql.dbaas.com.br','appdavivo','moreti30','appdavivo') or die('Erro ao conectar');
		//mysqli_select_db('appdavivo',$cn) or die('Erro ao selecionar o banco');
		$sqlstr=mysqli_query($cn,$sqlstr);
		return $sqlstr;
	}
}
?>