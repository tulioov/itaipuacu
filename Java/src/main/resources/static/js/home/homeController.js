

var gaugeCxCasa;

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
    	ligarDesligar(checked);
    }
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



function ligarDesligar(checked){
	
	var status = checked?"1":"0";
	var url = window.location.href + "ligaDesliga/" + status;
	
	$.ajax({
		url: url,
		type : 'get',
		data : { },
	    beforeSend : function(){
	         //alert("Enviando")
	    }
	})
	.done(function(msg){
				
	})
	.fail(function(jqXHR, textStatus, msg){
		alert("erro")
	});

}

function getStatus(){
	
	$.ajax({
		url: window.location.href + "/botaoBombaCasa",
		type : 'get'
	})
	.done(function(data){
		if(data && !$("#on-off-switch-bbcxcasa").prop('checked')){
			$("#on-off-switch-bbcxcasa").click();
			return;
		}
		if(!data && $("#on-off-switch-bbcxcasa").prop('checked')){
			$("#on-off-switch-bbcxcasa").click();
			return;
		}
	})
	.fail(function(jqXHR, textStatus, msg){
		alert("erro")
	});

}

$(document).ready(function(){
	getStatus();
});





