<?php
require_once('Conexao.class.php');
class Permissao extends Conexao{
	public function verificarPermissao($device){
		$sqlstr="select count(*) as tt from tbl_permissao where device='$device'";
		//echo $sqlstr;
		$sqlstr=$this->runSQL($sqlstr);
		$encontrado=mysqli_fetch_array($sqlstr)['tt'];
		if($encontrado==0){
			return '0';
		}else{
			return '1';
		}
	}
}
	
?>