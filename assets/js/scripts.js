
var ordem = new Array('segmento_usuario','piramide_usuario','grupo_usuario');
var msg = new Array('Selecione o segmento','Selecione a pirâmide','Selecione o grupo');

var segmento_usuario='null';
var piramide_usuario='null';
var grupo_usuario='null';
var filtros = 'nda';


var segmento_usuario = window.localStorage.getItem("segmento_usuario");
var piramide_usuario = window.localStorage.getItem("piramide_usuario");
var grupo_usuario = window.localStorage.getItem("grupo_usuario");
if(window.localStorage.getItem("filtros")){
	filtros = window.localStorage.getItem("filtros");
}

$("#logoVivo").fadeIn(2,function(){$(this).fadeOut(2,function(){layout();});});
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
			$('#palitagens-online').html(json.palitagensOnline);
			$('#conteudo').fadeIn('slow');
			setTimeout(carregarInformacoes, 300000);
		});
	})
	
	//$('#conteudo').html('<div class="row lista"><div class="col-xs-12 text-center"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="reiniciarFiltro()">FILTROS</button></div></div><div class="row"><div class="col-xs-12"> </div></div>').fadeIn('slow');
	/*google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Effort', 'Amount given'],
          ['My all',     50],
          ['My sal',     50]
        ]);

        var options = {
          pieHole: 0.5,
          pieSliceTextStyle: {
            color: '#ffffff',
          },
          backgroundColor: 'transparent',
          slices: {
            0: { color: '#0066cb' },
            1: { color: 'transparent' }
          },
          legend: 'none'
        };

        var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
        chart.draw(data, options);
      }*/
}
