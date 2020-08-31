package com.event.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.event.model.Interruptor;

@Controller
public class InterruptoresController {
	
	
	@PostMapping("/ligaDesliga")
	public String ligarOuDesligarInterruptor(){
		if(Interruptor.botao == 0) {
			Interruptor.botao = 1;
		}else {
			Interruptor.botao = 0;
		}
		System.out.println("Botao: " + Interruptor.botao);
		return "redirect:/?"+Interruptor.botao;
	}
	
	@RequestMapping("/botaoBombaCasa")
	public ResponseEntity<Object> botaoBombaCasa() {
		
		return new ResponseEntity<Object>(Interruptor.botao.toString(), HttpStatus.OK);
	}

}
