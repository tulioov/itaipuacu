package com.itaipuacu.model;

import java.util.ArrayList;
import java.util.List;

public class SensorNivelGraph {
	
	private List<Integer>  lstDadosCxAgua = new ArrayList<>();
	private List<Integer>  lstDadosCisterna = new ArrayList<>();
	
	public List<Integer> getLstDadosCxAgua() {
		return lstDadosCxAgua;
	}
	public void setLstDadosCxAgua(List<Integer> lstDadosCxAgua) {
		this.lstDadosCxAgua = lstDadosCxAgua;
	}
	public List<Integer> getLstDadosCisterna() {
		return lstDadosCisterna;
	}
	public void setLstDadosCisterna(List<Integer> lstDadosCisterna) {
		this.lstDadosCisterna = lstDadosCisterna;
	}
	
	
	
}
