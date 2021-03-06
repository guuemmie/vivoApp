
var ordem = new Array('segmento_usuario','piramide_usuario','grupo_usuario');
var msg = new Array('Selecione o segmento','Selecione a pirâmide','Selecione o grupo');

google.charts.load('current', {'packages':['bar']});

var segmento_usuario='null';
var piramide_usuario='null';
var grupo_usuario='null';
var filtros = 'nda';
var versao='1.1';
var dvc ='';

var segmento_usuario = window.localStorage.getItem("segmento_usuario");
var piramide_usuario = window.localStorage.getItem("piramide_usuario");
var grupo_usuario = window.localStorage.getItem("grupo_usuario");


if(window.localStorage.getItem("dvc")){
	dvc = window.localStorage.getItem("dvc");
}

if(window.localStorage.getItem("filtros")){
	filtros = window.localStorage.getItem("filtros");
}

$("#logoVivo").fadeIn(2000,function(){$(this).fadeOut(2000,function(){layout();});});
function layout(){
	$('.linhaNome').slideDown(1000,function(){
		$('.entrada').fadeIn(1000);
		fnVersao(versao);
		//inicio();
	})
}
function fnVersao(v){
	// Analytics
	analytics();
	// VERIFICAR SE A VERSÃO É A VERSÃO ATUAL DO APP
	$.ajax({
	  method: "POST",
	  crossDomain: true,
	  data: {
	  	versao:v
	  }
	  ,url: "http://multimsg.tempsite.ws/appvivo/versao.php"
	  ,beforeSend: function() {
	  		$('#conteudo').fadeIn('fast',function(){
	  			$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Verificando versão</div></div>');
	  		})
	  		
	  }
	}).done(function( html ) {
			if(v==html){
				$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Verificado</div></div>').fadeOut('fast');
				//inicio();
				permissao();
			}else{
				$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Existe uma versão mais recente, por favor baixe novamente o app.</div></div>');
			}
	});
}
function permissao(){
	if(dvc.length<2){
		startScan();
	}else{
		verificaPremissao(dvc);
	}
}
function verificaPremissao(dvc){
	resposta=false;
	$.ajax({
	  method: "POST",
	  crossDomain: true,
	  data: {
	  	dvc:dvc
	  }
	  ,url: "http://multimsg.tempsite.ws/appvivo/permissao.php"
	  ,beforeSend: function() {
	  		$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Verificando permissões</div></div>').fadeIn('fast');
	  }
	}).done(function( html ) {
		if(html=='1'){
			$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Verificado</div></div>').fadeOut('fast');
			inicio();
		}else{
			$('#conteudo').html('<div class="row"><div class="col-xs-12 text-center">Sem permissão: ' + dvc + '</div></div>').fadeIn('fast');
		}
	});
	return resposta;
}
function inicio(){
	for(i=0;i<ordem.length;i++){
		if(eval(ordem[i])=='null' || eval(ordem[i])==null || eval(ordem[i])==undefined){
			Lista(ordem[i],msg[i]);
			return true;
		}
	}
	$('#conteudo').fadeOut('fast',function(){
		iniciarInformacao();
	})
	
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
	filtros = 'nda';

	window.localStorage.setItem('segmento_usuario', 'null');
	window.localStorage.setItem('piramide_usuario', 'null');
	window.localStorage.setItem('grupo_usuario', 'null');
	window.localStorage.setItem('filtros', 'nda');

	inicio();
}
function carregarInformacoes(){
	//setTimeout(function, 60000);
		$.ajax({
			  method: "POST",
			  crossDomain: true,
			  data: {
			  	filtros: filtros
			  },
			  dataType: "json",
			  url: "http://multimsg.tempsite.ws/appvivo/palitagens.php"
		}).done(function( json ) {

			$('#palitagens-online').html(json.palitagensOnline);
			htmlOper='';
			for(i=0;i<json.topOperadores.length;i++){
				htmlOper+='<tr><td>' + json.topOperadores[i].cpf +'</td><td>' + json.topOperadores[i].tt +'</td></tr>';
			}

			$('#topOperadores').html('<table class="table table-striped"><tr><td><strong>CPF</strong></td><td><strong>Palitagens</strong></td></tr>' + htmlOper + '</table>')
			$('#dtAtualizacao').html('Palitagens até o momento (' + json.UltimaAtualizacao + ')');

			// GERAR GRÁFICOS DE COMPARAÇÃO ONLINE
			var dados = [['Palitagens', 'Quantidade'],["D-7",parseInt(json.palitagensD7)],["Ontem",parseInt(json.palitagensD1)],["Hoje",parseInt(json.palitagensOnline)]];
			barra(dados);
			//$('#conteudo').fadeIn('slow');
		});
}
function iniciarInformacao(){
	$('#conteudo').load('info-online.html',function(){
		$.ajax({
			  method: "POST",
			  crossDomain: true,
			  data: {
			  	filtros: filtros
			  },
			  dataType: "json",
			  url: "http://multimsg.tempsite.ws/appvivo/palitagens.php"
		}).done(function( json ) {
			$('#seg').html(segmento_usuario);
			$('#pir').html(piramide_usuario);
			$('#gru').html(grupo_usuario);
			$('#palitagens-online').html(json.palitagensOnline);
			$('#conteudo').fadeIn('slow');


			htmlOper='';
			for(i=0;i<json.topOperadores.length;i++){
				htmlOper+='<tr><td>' + json.topOperadores[i].cpf +'</td><td>' + json.topOperadores[i].tt +'</td></tr>';
			}

			$('#topOperadores').html('<table class="table table-striped"><tr><td><strong>CPF</strong></td><td><strong>Palitagens</strong></td></tr>' + htmlOper + '</table>')
			$('#dtAtualizacao').html('Palitagens até o momento (' + json.UltimaAtualizacao + ')');

			// GERAR GRÁFICOS DE COMPARAÇÃO ONLINE			
			var dados = [['Palitagens', 'Quantidade'],["D-7",parseInt(json.palitagensD7)],["Ontem",parseInt(json.palitagensD1)],["Hoje",parseInt(json.palitagensOnline)]];
			barra(dados);
			

			setTimeout(carregarInformacoes, 300000);
		
		});
	})
	
	//$('#conteudo').html('<div class="row lista"><div class="col-xs-12 text-center"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="reiniciarFiltro()">FILTROS</button></div></div><div class="row"><div class="col-xs-12"> </div></div>').fadeIn('slow');
	
}
function analytics(){
	$.ajax({
	  method: "POST",
	  crossDomain: true
	  ,url: "http://multimsg.tempsite.ws/appvivo/analytics_app.php"
	})
}
