<?php
require_once("Conexao.class.php");
class Palitagens extends Conexao{
	private static $filtros;
	public function __construct($filtros){
		self::$filtros=$filtros;
	}
	private function quantidadeOnline(){
		$filtros=self::$filtros;
		$filtros=substr($filtros, 8);
		$sqlstr="select count(*) tt from tbl_registros_online where data>=DATE_FORMAT(now(),'%Y-%m-%d') and $filtros";
		//echo $sqlstr;
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function info(){
		
		$quantOnline=number_format(mysqli_fetch_array($this->quantidadeOnline())['tt'],0,'','.');
		$arr=array('palitagensOnline'=>$quantOnline);
		return json_encode($arr);
	}
}
?>