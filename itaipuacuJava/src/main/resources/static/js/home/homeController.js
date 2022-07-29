const HomeController = {
		
	init(interruptores){
		
		gaugeCxCasa = Gauge(
			document.getElementById("gaugeCxCasaId"),
				{
					min: 0,
					max: 100,
					dialStartAngle: 180,
					dialEndAngle: 0,
					value: 50,
					viewBox:"-7 0 100 60",
					color: function(value) {
			            if(value < 20) {
			            	return "#ef4655";
			            }else if(value < 40) {
			            	return "#f7aa38";
			            }else if(value < 60) {
			            	return "#fffa50";
			            }else {
			            	return "#5ee432";
			            }
				}
	        }
		);
		
		gaugeCxCisterna = Gauge(
			document.getElementById("gaugeCxCisternaId"),
				{
					min: 0,
					max: 100,
					dialStartAngle: 180,
					dialEndAngle: 0,
					value: 50,
					viewBox:"-7 0 100 60",
					color: function(value) {
						if(value < 20) {
			            	return "#ef4655";
			            }else if(value < 40) {
			            	return "#f7aa38";
			            }else if(value < 60) {
			            	return "#fffa50";
			            }else {
			            	return "#5ee432";
			            }
				}
	        }
		);

		
		$(interruptores).each(function(index, interruptor) {
			new DG.OnOffSwitch({
				
			    el:'#on-off-switch-'+interruptor.id,
			    height: 80,
			    trackColorOn:interruptor.color,
			    trackColorOff:'#666',
			    trackBorderColor:'#555',
			    textColorOff:'#fff',
			    textOn:interruptor.nome,
			    textOff:interruptor.nome,
			    listener:function(name, checked){
			    	HomeController.ligarDesligar(interruptor,checked);
		        }
			});
		});
	},
	
	ligarDesligar(interruptor, checked){
		
		var status = checked?"1":"0";
		var url = window.location.href + interruptor.urlLigaDesliga + status;
		
		$.ajax({
			url: url,
			type : 'get',
			data : { },
		    beforeSend : function(){
		    }
		})
	},
	
	getStatus(interruptores){
		
		
		$(interruptores).each(function(index, interruptor) {
			$.ajax({
				url: window.location.href + interruptor.urlVerificaStatus,
				type : 'get'
			})
			.done(function(data){
				if(data == '1' && !$("#on-off-switch-"+interruptor.id).prop('checked')){
					$("#on-off-switch-"+interruptor.id).click();
					return;
				}
				if(data != '1' && $("#on-off-switch-"+interruptor.id).prop('checked')){
					$("#on-off-switch-"+interruptor.id).click();
					return;
				}
			})
		});
		$.ajax({
			url: window.location.href + "/getNivelCxCasa",
			type : 'get'
		}).done(function(data){
			gaugeCxCasa.setValue(data);
		})
			
		$.ajax({
			url: window.location.href + "/getNivelCxCisterna",
			type : 'get'
		}).done(function(data){
			gaugeCxCisterna.setValue(data);
			$("#gaugeCxCisternalabel").html(data);
		})
		
	}
}

$(document).ready(function(){
	
	let interruptores = [
		{
			"id": "bbcxcasa",
		    "nome": "BB CASA",
		    "color" : "#F57C00",
		    "urlLigaDesliga":"ligaDesligaBBCasa/",
		    "urlVerificaStatus":"/botaoBombaCasa/"
		},
		{
			"id": "auto-bbcxcasa",
			"nome": "BB AUTO",
			"color" : "#007bff",
			"urlLigaDesliga":"ligaDesligaAutoBBCasa/",
		    "urlVerificaStatus":"/botaoBombaCasaAuto/"
		},
		{
			"id": "bbPiscina",
			"nome": "BB Piscina",
			"color" : "#F57C00",
			"urlLigaDesliga":"ligaDesligaBombaPiscina/",
		    "urlVerificaStatus":"/botaoBombaPiscina/"
		},
		{
			"id": "luzPsicina",
			"nome": "Luz Piscina",
			"color" : "#F57C00",
			"urlLigaDesliga":"ligaDesligaLuzPiscina/",
		    "urlVerificaStatus":"/botaoLuzPiscina/"
		}
	];
	HomeController.init(interruptores);
	HomeController.getStatus(interruptores);
	
	setInterval(function(){ 
		HomeController.getStatus(interruptores);
	}, 2000);
	
	
    data1 = [0,10,20,30,40,50,60,70,80,100];
    data2 = [100,90,80,70,60,40,60,70,80,100];
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        options: {
            responsive: true,
            plugins: {
            		legend: {
            			position: 'top',
        		},
              		title: {
              		display: true,
              		text: 'Chart.js Line Chart'
          		}
            }
        },
        data: {
        	  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        	  datasets: [{
        		  label: 'Dataset 1',
        	      data: data1,
        	      borderColor: '#DC143C' ,
        	  },
        	  {
        	      label: 'Dataset 2',
        	      data: data2,
        	      borderColor: '#0000FF',
        	  }]
        }
    });
});





