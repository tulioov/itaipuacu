package com.itaipuacu;

import java.util.ArrayList;
import java.util.List;

public class Teste {

	public static void main(String[] args) {
		
		List<String> pilha = new ArrayList<>();
		pilha.add("elemento1");
		pilha.add("elemento2");
		pilha.add("elemento3");

		String ele = (String) pilha.remove(0);
		
		pilha.add("elemento4");
		pilha.add("elemento5");
		pilha.add("elemento6");

	}

}
