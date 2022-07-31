package com.itaipuacu.job;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.itaipuacu.model.SensorCx;

@Component
public class JobGraph {
	
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat(
			"MM/dd/yyyy HH:mm:ss");
	
	// 72 vezes 20 min em uma dia
	// a cada 20min
	@Scheduled(fixedRate = 1200000)
	public void performDelayedTask() {
		
		if(SensorCx.getSng().getLstDadosCisterna().size() > 72) {
			SensorCx.getSng().getLstDadosCisterna().remove(0);
		}
		if(SensorCx.getSng().getLstDadosCxAgua().size() > 72) {
			SensorCx.getSng().getLstDadosCxAgua().remove(0);
		}
		
		SensorCx.getSng().getLstDadosCisterna().add(SensorCx.getNivelAguaCisterna());
		SensorCx.getSng().getLstDadosCxAgua().add(SensorCx.getNivelAguaCasa());
		System.out.println("Job executado em:  " + dateFormat.format(new Date()));

	}

}
