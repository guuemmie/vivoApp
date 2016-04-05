function barra(dados){

	
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(dados);

        var options = {
          title: 'Palitagens',
          legend: { position: 'none' },
          
          axes: {
            x: {
              0: { side: 'top'} // Top x-axis.
            }
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, options);
    }

}