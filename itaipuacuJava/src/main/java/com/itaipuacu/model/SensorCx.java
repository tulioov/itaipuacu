package com.itaipuacu.model;

public class SensorCx {
	
	private static int nivelAguaCasa = 0;
	private static int nivelAguaCisterna = 0;
	private static SensorNivelGraph sng = new SensorNivelGraph();
	
	public static int getNivelAguaCasa() {
		return nivelAguaCasa;
	}
	public static void setNivelAguaCasa(int nivelAguaCasa) {
		SensorCx.nivelAguaCasa = nivelAguaCasa;
	}
	public static int getNivelAguaCisterna() {
		return nivelAguaCisterna;
	}
	public static void setNivelAguaCisterna(int nivelAguaCisterna) {
		SensorCx.nivelAguaCisterna = nivelAguaCisterna;
	}
	public static SensorNivelGraph getSng() {
		return sng;
	}
	public static void setSng(SensorNivelGraph sng) {
		SensorCx.sng = sng;
	}
	
	
}
