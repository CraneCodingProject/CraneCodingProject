package com.cranecoding.dto.calculation;

public class CalculationDTO {
	private int idcalculation;
	private String calculationname;
	
	public CalculationDTO(int idcalculation, String calculationname) {
		this.idcalculation = idcalculation;
		this.calculationname = calculationname;
	}

	public int getIdcalculation() {
		return idcalculation;
	}

	public void setIdcalculation(int idcalculation) {
		this.idcalculation = idcalculation;
	}

	public String getCalculationname() {
		return calculationname;
	}

	public void setCalculationname(String calculationname) {
		this.calculationname = calculationname;
	}
	
	
}
