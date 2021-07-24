package com.itaipuacu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itaipuacu.service.BotaoService;

@Controller
public class InterruptoresController {
	
	@Autowired
	BotaoService botaoService;
	
	@RequestMapping("/ligaDesliga/{status}")
	public ResponseEntity<Object> ligarOuDesligarInterruptor(@PathVariable("status") String status){
        return botaoService.ligaDesliga(status);
	}
	
	@RequestMapping("/botaoBombaCasa")
	public ResponseEntity<Object> botaoBombaCasa() {
		return botaoService.statusBombaCasa();
	}
}
