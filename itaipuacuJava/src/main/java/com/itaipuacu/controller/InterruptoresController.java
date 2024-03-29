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

	@RequestMapping("/{botaoId}/{status}")
	public ResponseEntity<Object> ligarOuDesligarInterruptor(@PathVariable("botaoId") String botaoId,
			@PathVariable("status") String status) {
		return botaoService.ligaDesliga(botaoId, status);

	}

	@RequestMapping("/{botaoId}")
	public ResponseEntity<Object> botaoBombaCasa(@PathVariable("botaoId") String botaoId) {
		return botaoService.statusInterruptor(botaoId);
	}
}
