package com.cranecoding.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cranecoding.dto.calculation.CalculationDAO;
import com.cranecoding.dto.calculation.CalculationDTO;
import com.cranecoding.model.calculation;

@Service
public interface GameService {
	
	List<CalculationDTO> getAllCaculation();
	calculation getCalculationById(int id);
	
}
