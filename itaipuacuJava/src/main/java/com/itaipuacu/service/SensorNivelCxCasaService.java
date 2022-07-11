package com.itaipuacu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itaipuacu.model.Interruptor;
import com.itaipuacu.model.SensorCx;

@Service
public class SensorNivelCxCasaService {
	
	@Autowired
	BotaoService btnService;
	
	static int contRuido = 0;
	
	public void automatico(int nivel){
		
		if(Interruptor.botaoAuto == 1 && nivel < 20 && this.btnService.statusInterruptor("botaoBombaCasa").getBody().equals("0")){
			this.btnService.ligaDesliga("ligaDesligaBBCasa","1");
		}
		
		if (Interruptor.botaoAuto == 1 && nivel >= 95 && this.btnService.statusInterruptor("botaoBombaCasa").getBody().equals("1")) {
			contRuido++;
			if(contRuido == 2){
				contRuido = 0;
				this.btnService.ligaDesliga("ligaDesligaBBCasa","1");
			}
		}
	}

	public ResponseEntity<Object> setNivelCxCasa(double nivelD) {
		
		int nivel = (int)nivelD;
		
		nivel = 48 - nivel;
		nivel = nivel * 100 / 28;
		SensorCx.nivelAguaCasa = nivel;
		
		automatico(nivel);

		return new ResponseEntity<>("OK", HttpStatus.OK);
	}

	public ResponseEntity<Object> getNivelCxCasa() {
		
		return new ResponseEntity<>(Integer.valueOf(SensorCx.nivelAguaCasa), HttpStatus.OK);
	}

	public ResponseEntity<Object> setNivelCxCisterna(int nivel) {
		SensorCx.nivelAguaCisterna = nivel;
		return new ResponseEntity<>("OK", HttpStatus.OK);
	}

	public ResponseEntity<Object> getNivelCxCisterna() {
		return new ResponseEntity<>(Integer.valueOf(SensorCx.nivelAguaCisterna), HttpStatus.OK);
	}
}