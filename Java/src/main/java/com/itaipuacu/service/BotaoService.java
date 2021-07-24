package com.itaipuacu.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itaipuacu.model.Interruptor;

@Service
public class BotaoService {
	
	public ResponseEntity<Object> statusBombaCasa() {
		return new ResponseEntity<Object>(Interruptor.botao.toString().equals("1")?true:false, HttpStatus.OK);
	}
	
	public ResponseEntity<Object> ligaDesliga(String status) {
		
		try {
			
			Interruptor.botao = Integer.parseInt(status);
			
			if(Interruptor.botao == 1) {
				System.out.println("ON");
		        return new ResponseEntity<Object>("ON", HttpStatus.OK);
			}
			System.out.println("OFF");
			return new ResponseEntity<Object>("OFF", HttpStatus.OK);
			
		} catch (Exception e) {
			return null;
		}
		
		
	}

}
