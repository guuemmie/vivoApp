
var ordem = new Array('segmento_usuario','piramide_usuario','grupo_usuario');
var msg = new Array('Selecione o segmento','Selecione a pirâmide','Selecione o grupo');

var segmento_usuario='null';
var piramide_usuario='null';
var grupo_usuario='null';
var filtros = '0';


var segmento_usuario = window.localStorage.getItem("segmento_usuario");
var piramide_usuario = window.localStorage.getItem("piramide_usuario");
var grupo_usuario = window.localStorage.getItem("grupo_usuario");
var filtros = window.localStorage.getItem("filtros");

$("#logoVivo").fadeIn(2000,function(){$(this).fadeOut(2000,function(){layout();});});
function layout(){
	$('.linhaNome').slideDown(1000,function(){
		$('.entrada').fadeIn(1000);
		inicio();
	})
}
function inicio(){
	for(i=0;i<ordem.length;i++){
		if(eval(ordem[i])=='null' || eval(ordem[i])==null || eval(ordem[i])==undefined){
			Lista(ordem[i],msg[i]);
			return true;
		}
	}
	//iniciarInformacao();
}
function Lista(campoDestino,msg){
	$.ajax({
	  method: "POST",
	  crossDomain: true,
	  data: {
	  	campoDestino:campoDestino
	  	,msg: msg
	  	,filtros: filtros
	  }
	  ,url: "http://multimsg.tempsite.ws/appvivo/combos.php"
	  ,beforeSend: function() {
	  		$('#conteudo').fadeOut('fast');
	  }
	}).done(function( html ) {
		$('#conteudo').html(html).fadeIn('slow');
	});
}
function addFiltro(campo,valor){
	var string=campo +"='" + valor + "';";
	filtros=filtros + " and " + campo +"='" + valor + "'";
	eval(string);
	window.localStorage.setItem(campo, valor);
	window.localStorage.setItem('filtros', filtros);
	inicio();
	
}
function reiniciarFiltro(){
	segmento_usuario='null';
	piramide_usuario='null';
	grupo_usuario='null';
	filtros = '0';

	window.localStorage.setItem('segmento_usuario', 'null');
	window.localStorage.setItem('piramide_usuario', 'null');
	window.localStorage.setItem('grupo_usuario', 'null');
	window.localStorage.setItem('filtros', '0');

	inicio();
}
function iniciarInformacao(){
	$('#conteudo').html('<div class="row lista"><div class="col-xs-12 text-center"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="reiniciarFiltro()">REINICIAR</button></div></div>').fadeIn('slow');
}
