package com.itaipuacu.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itaipuacu.model.Interruptor;

@Service
public class BotaoService {

	public ResponseEntity<Object> statusInterruptor(String urlInterruptor) {

		if ("botaoBombaCasa".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botaoBBCasa.toString(), HttpStatus.OK);
		}

		if ("botaoBombaCasaAuto".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botaoBBCasaAuto.toString(), HttpStatus.OK);
		}
		
		if ("botaoBombaPiscina".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botaoBombaPiscina.toString(), HttpStatus.OK);
		}
		
		if ("botaoLuzPiscina".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botaoLuzPiscina.toString(), HttpStatus.OK);
		}
		
		return null;
	}

	public ResponseEntity<Object> ligaDesliga(String acao, String status) {
		try {

			if ("ligaDesligaBBCasa".equals(acao)) {

				Interruptor.botaoBBCasa = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botaoBBCasa.intValue() == 1) {
					return new ResponseEntity<>("ON", HttpStatus.OK);
				}
				return new ResponseEntity<>("OFF", HttpStatus.OK);

			}

			if ("ligaDesligaAutoBBCasa".equals(acao)) {
				Interruptor.botaoBBCasaAuto = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botaoBBCasaAuto.intValue() == 1) {
					return new ResponseEntity<>("ON", HttpStatus.OK);
				}
				return new ResponseEntity<>("OFF", HttpStatus.OK);
			}
			if ("ligaDesligaBombaPiscina".equals(acao)) {
				Interruptor.botaoBombaPiscina = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botaoBombaPiscina.intValue() == 1) {
					return new ResponseEntity<>("ON", HttpStatus.OK);
				}
				return new ResponseEntity<>("OFF", HttpStatus.OK);
			}
			if ("ligaDesligaLuzPiscina".equals(acao)) {
				Interruptor.botaoLuzPiscina = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botaoLuzPiscina.intValue() == 1) {
					return new ResponseEntity<>("ON", HttpStatus.OK);
				}
				return new ResponseEntity<>("OFF", HttpStatus.OK);
			}
			
			return null;

		} catch (Exception e) {
			return null;
		}
	}
}
