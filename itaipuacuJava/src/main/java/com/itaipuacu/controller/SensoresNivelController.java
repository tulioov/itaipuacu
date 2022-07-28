package com.itaipuacu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itaipuacu.service.SensorNivelCxCasaService;

@Controller
public class SensoresNivelController {
	@Autowired
	SensorNivelCxCasaService sensorNivelService;

	@RequestMapping({ "/cxCasa/{nivel}" })
	public ResponseEntity<Object> setNivelCxCasa(@PathVariable("nivel") Double nivel) {
		return this.sensorNivelService.setNivelCxCasa(nivel);
	}

	@RequestMapping({ "/getNivelCxCasa" })
	public ResponseEntity<Object> getNivelCxCasa() {
		return this.sensorNivelService.getNivelCxCasa();
	}

	@RequestMapping({ "/cxCisterna/{nivel}" })
	public ResponseEntity<Object> setNivelCxCisterna(@PathVariable("nivel") int nivel) {
		this.sensorNivelService.setNivelCxCisterna(nivel);
		return null;
	}

	@RequestMapping({ "/getNivelCxCisterna" })
	public ResponseEntity<Object> getNivelCxCisterna() {
		return this.sensorNivelService.getNivelCxCisterna();
	}
}