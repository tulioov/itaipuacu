
var gaugeCxCasa;
var gaugeCxCisterna;

setInterval(function(){ 
	getStatus();
}, 5000);

new DG.OnOffSwitch({
	
	    el:'#on-off-switch-bbcxcasa',
	    height: 80,
	    trackColorOn:'#F57C00',
	    trackColorOff:'#666',
	    trackBorderColor:'#555',
	    textColorOff:'#fff',
	    textOn:'BB CASA ON',
	    textOff:'BB CASA OFF',
	    listener:function(name, checked){
	    	ligarDesligar(checked);
        }
	});

new DG.OnOffSwitch({
	
    el:'#on-off-switch-auto-bbcxcasa',
    height: 80,
    trackColorOn:'#007fff ',
    trackColorOff:'#666',
    trackBorderColor:'#555',
    textColorOff:'#fff',
    textOn:'BB AUTO ON',
    textOff:'BB AUTO OFF',
    listener:function(name, checked){
    	ligarDesligarAuto(checked);
    }
});

$(function () {
	gaugeCxCisterna = $("#gaugeCxCisterna").dynameter({
		label: 'Cisterna',
		value: 80,
		min: 0.0,
		max: 100,
		unit: '%',
		regions: {
			0 : 'error',
			15 : 'warn',
			40 : 'normal'
		}
	});
	gaugeCxCisterna.changeValue(30);
});

$(function () {
	gaugeCxCasa = $("#gaugeCxCasa").dynameter({
		label: 'Cx Casa',
		value: 80,
		min: 0.0,
		max: 100,
		unit: '%',
		regions: {
			0 : 'error',
			15 : 'warn',
			40 : 'normal'
		}
	});
	gaugeCxCasa.changeValue(30);
});


function ligarDesligarAuto(checked){
	
	var status = checked?"1":"0";
	var url = window.location.href + "ligaDesligaAuto/" + status;
	
	$.ajax({
		url: url,
		type : 'get',
		data : { },
	    beforeSend : function(){
	    }
	})
}

function ligarDesligar(checked){
	
	var status = checked?"1":"0";
	var url = window.location.href + "ligaDesliga/" + status;
	
	$.ajax({
		url: url,
		type : 'get',
		data : { },
	    beforeSend : function(){
	    }
	})
}

function getStatus(){
	
	
	$.ajax({
		url: window.location.href + "/botaoBombaCasaAuto",
		type : 'get'
	})
	.done(function(data){
		if(data == '1' && !$("#on-off-switch-auto-bbcxcasa").prop('checked')){
			$("#on-off-switch-auto-bbcxcasa").click();
			return;
		}
		if(data != '1' && $("#on-off-switch-auto-bbcxcasa").prop('checked')){
			$("#on-off-switch-auto-bbcxcasa").click();
			return;
		}
	})
	
	$.ajax({
		url: window.location.href + "/botaoBombaCasa",
		type : 'get'
	})
	.done(function(data){
		if(data == '1' && !$("#on-off-switch-bbcxcasa").prop('checked')){
			$("#on-off-switch-bbcxcasa").click();
			return;
		}
		if(data != '1' && $("#on-off-switch-bbcxcasa").prop('checked')){
			$("#on-off-switch-bbcxcasa").click();
			return;
		}
	})
		
	$.ajax({
		url: window.location.href + "/getNivelCxCasa",
		type : 'get'
	})
	.done(function(data){
		gaugeCxCasa.changeValue(data);
	})
		
	$.ajax({
		url: window.location.href + "/getNivelCxCisterna",
		type : 'get'
	})
	.done(function(data){
		gaugeCxCisterna.changeValue(data);
		$("#gaugeCxCisternalabel").html(data);
	})
	
}

$(document).ready(function(){
	getStatus();
});





