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
			    textOn:interruptor.nome+' ON',
			    textOff:interruptor.nome+' OFF',
			    listener:function(name, checked){
			    	HomeController.ligarDesligar(interruptor);
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
				url: window.location.href + "/"+interruptor.urlVerificaStatus,
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
		    "urlVerificaStatus":"botaoBombaCasa/"
		},
		{
			"id": "auto-bbcxcasa",
			"nome": "BB AUTO",
			"color" : "#00FF00",
			"urlLigaDesliga":"ligaDesligaAutoBBCasa/",
		    "urlVerificaStatus":"botaoBombaCasaAuto/"
		},
		{
			"id": "bbPiscina",
			"nome": "BB Piscina",
			"color" : "#F57C00",
			"url":"",
		    "urlVerificaStatus":""
		},
		{
			"id": "luzPsicina",
			"nome": "Luz Piscina",
			"color" : "#F57C00",
			"url":"",
		    "urlVerificaStatus":""
		}
	];
	
	setInterval(function(){ 
		HomeController.getStatus(interruptores);
	}, 5000);
	HomeController.getStatus(interruptores);
	
	HomeController.init(interruptores);
	
    data = [
        [8,6,3,5,12,8,5,4,6,12],
        [4,8,6,3,5,2,4,8,5,2],
        [8,6,3,5,9,4,5,8,4,6]
    ];
    
    colorsFill = [
        'Gradient(rgba(96,0,0,0.5):red:red:red:red)',
        'Gradient(rgba(0,96,0,0.5):#0f0:#0f0:#0f0)',
        'Gradient(rgba(0,0,96,0.5):rgba(0,0,96,0.5):blue:blue:blue)'
    ];

    frms = 20;
    l1 = new RGraph.Line({
        id: 'cvs',
        data: data,
        options: {
            textColor: '#fff',
            tickmarksStyle: null,
            shadow: false,
            linewidth: 0.001,
            colorsBackground: 'black',
            backgroundGridVlines: false,
            backgroundGridColor: '#666',
            backgroundGridBorder: false,
            xaxis: false,
            yaxis: false,
            spline: true,
            filled: true,
            
            filledColors: [colorsFill[0],'transparent','transparent'],

            yaxisScaleMax: 35,
            xaxisLabels:['8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm'],
            textSize: 12,
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 40,
            marginRight: 15
        }
    }).trace({frames: frms}, drawChart2);

    function drawChart2 ()
    {
        l2 = new RGraph.Line({
            id: 'cvs',
            data: data,
            options: {
                tickmarksStyle: false,
                shadow: false,
                linewidth: 0.001,
                backgroundGrid: false,
                xaxis: false,
                yaxis: false,
                
                filledColors: ['transparent', colorsFill[1], 'transparent'],
                
                spline: true,
                filled: true,
                yaxisScaleMax: 35,
                marginTop: 15,
                marginBottom: 15,
                marginLeft: 40,
                marginRight: 15
            }
        }).trace({frames: frms}, drawChart3);
    }

    function drawChart3 ()
    {
        l3 = new RGraph.Line({
            id: 'cvs',
            data: data,
            options: {
                tickmarksStyle: false,
                shadow: false,
                linewidth: 0.001,
                backgroundGrid: false,
                xaxis: false,
                yaxis: false,
                filledColors: ['transparent', 'transparent', colorsFill[2]],
                
                spline: true,
                filled: true,
                yaxisScaleMax: 35,
                marginTop: 15,
                marginBottom: 15,
                marginLeft: 40,
                marginRight: 15
            }
        }).trace({frames: frms});
    }

    setTimeout(function ()
    {
        l1.responsive([
            {maxWidth:null,width: 600,height:250,css: {'float': 'right'},callback: function (){l1.properties.colors = RGraph.arrayClone(l1.original_colors);l2.properties.colors = RGraph.arrayClone(l2.original_colors);l3.properties.colors = RGraph.arrayClone(l3.original_colors);RGraph.redraw();}},
            {maxWidth:500, width: 400,height:150,css: {'float': 'none'},callback: function () {l1.properties.colors = RGraph.arrayClone(l1.original_colors);l2.properties.colors = RGraph.arrayClone(l2.original_colors);l3.properties.colors = RGraph.arrayClone(l3.original_colors);RGraph.redraw();}}
        ]);
    }, 1500)
});





