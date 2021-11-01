package com.itaipuacu.service;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itaipuacu.model.Interruptor;

@Service
public class BotaoService {

	public ResponseEntity<Object> statusBombaCasa() {
		return new ResponseEntity(Interruptor.botao.toString(), HttpStatus.OK);
	}

	public ResponseEntity<Object> statusBombaCasaAuto() {
		return new ResponseEntity(Interruptor.botaoAuto.toString(), HttpStatus.OK);
	}

	public ResponseEntity<Object> ligaDesligaAuto(String status) {

		try {
			Interruptor.botaoAuto = Integer.valueOf(Integer.parseInt(status));

			if (Interruptor.botaoAuto.intValue() == 1) {
				System.out.println("ON Auto" + new Date());
				return new ResponseEntity("ON", HttpStatus.OK);
			}
			System.out.println("OFF Auto" + new Date());
			return new ResponseEntity("OFF", HttpStatus.OK);
		} catch (Exception e) {
			return null;
		}

	}

	public ResponseEntity<Object> ligaDesliga(String status) {
		try {
			Interruptor.botao = Integer.valueOf(Integer.parseInt(status));

			if (Interruptor.botao.intValue() == 1) {
				System.out.println("ON " + new Date());
				return new ResponseEntity("ON", HttpStatus.OK);
			}
			System.out.println("OFF " + new Date());
			return new ResponseEntity("OFF", HttpStatus.OK);
		} catch (Exception e) {
			return null;
		}
	}
}
