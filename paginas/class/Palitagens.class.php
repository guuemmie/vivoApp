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
	private function quantidadeD1(){
		$filtros=self::$filtros;
		$filtros=substr($filtros, 8);
		$sqlstr="select count(*) tt from tbl_registros_online where data >=DATE_ADD(DATE_FORMAT(now(),'%Y-%m-%d'),INTERVAL -1 DAY) and data<DATE_ADD(now(),INTERVAL -1 DAY) and $filtros";
		//echo $sqlstr;
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	private function quantidadeD7(){
		$filtros=self::$filtros;
		$filtros=substr($filtros, 8);
		$sqlstr="select count(*) tt from tbl_registros_online where data >=DATE_ADD(DATE_FORMAT(now(),'%Y-%m-%d'),INTERVAL -7 DAY) and data<DATE_ADD(now(),INTERVAL -7 DAY) and $filtros";
		//echo $sqlstr;
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function info(){
		
		$quantOnline=number_format(mysqli_fetch_array($this->quantidadeOnline())['tt'],0,'','');
		$quantD1=number_format(mysqli_fetch_array($this->quantidadeD1())['tt'],0,'','');
		$quantD7=number_format(mysqli_fetch_array($this->quantidadeD7())['tt'],0,'','');

		$arr=array('palitagensOnline'=>$quantOnline,'palitagensD1'=>$quantD1,'palitagensD7'=>$quantD7);
		return json_encode($arr);
	}
}
?>