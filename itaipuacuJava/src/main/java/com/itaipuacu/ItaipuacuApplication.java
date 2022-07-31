package com.itaipuacu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ItaipuacuApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItaipuacuApplication.class, args);
	}
}
