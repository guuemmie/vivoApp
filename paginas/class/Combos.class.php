<?
require_once('Conexao.class.php');
class Combos extends Conexao{
	private static $filtros;
	public function __construct($filtros){
		self::$filtros=$filtros;
	}
	private function getCombo($nomeCampoDestino){
		$filtros=self::$filtros;
		//echo $filtros . '--';
		if($filtros=='nda'){
			$where='';
		}else{
			$where=' where ' . substr($filtros,7);
		}

		$sqlstr="select distinct $nomeCampoDestino from tbl_registros_online $where";
		//echo $sqlstr;
		$sqlstr=$this->runSql($sqlstr);
		return $sqlstr;
	}
	public function getHtmlCombo($nomeCampoDestino,$msg){
		$html='<div class="row listaCabecalho"><div class="col-xs-12 text-center">' . $msg . '</div></div>';
		$sqlstr=$this->getCombo($nomeCampoDestino);
		while($row=mysqli_fetch_array($sqlstr)){
			$html.='<div class="row lista"><div class="col-xs-12 text-center"><button type="button" class="btn btn-default btn-lg btn-block" onclick="addFiltro(\''. $nomeCampoDestino .'\',this.innerText)">' . $row[$nomeCampoDestino] . '</button></div></div>';
		}
		if($nomeCampoDestino!='segmento_usuario'){
			$html.='<div class="row lista"><div class="col-xs-12 text-center"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="reiniciarFiltro()">REINICIAR</button></div></div>';
		}
		return $html;
	}
}
?>