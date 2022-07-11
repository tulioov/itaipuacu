package com.itaipuacu.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itaipuacu.model.Interruptor;

@Service
public class BotaoService {

	public ResponseEntity<Object> statusInterruptor(String urlInterruptor) {

		if ("botaoBombaCasa".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botao.toString(), HttpStatus.OK);
		}

		if ("botaoBombaCasaAuto".equals(urlInterruptor)) {
			return new ResponseEntity<>(Interruptor.botaoAuto.toString(), HttpStatus.OK);
		}
		
		return null;
	}

	public ResponseEntity<Object> ligaDesliga(String acao, String status) {
		try {

			if ("ligaDesligaBBCasa".equals(acao)) {

				Interruptor.botao = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botao.intValue() == 1) {
					return new ResponseEntity<>("ON", HttpStatus.OK);
				}
				return new ResponseEntity<>("OFF", HttpStatus.OK);

			}

			if ("ligaDesligaAutoBBCasa".endsWith(acao)) {
				Interruptor.botaoAuto = Integer.valueOf(Integer.parseInt(status));

				if (Interruptor.botaoAuto.intValue() == 1) {
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
