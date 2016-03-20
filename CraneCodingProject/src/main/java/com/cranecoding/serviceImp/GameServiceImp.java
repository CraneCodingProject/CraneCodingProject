package com.cranecoding.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.calculation.CalculationDAO;
import com.cranecoding.dto.calculation.CalculationDTO;
import com.cranecoding.model.calculation;
import com.cranecoding.service.GameService;
@Service
public class GameServiceImp implements GameService {

	@Autowired
	private CalculationDAO calculationDao;

	@Override
	public List<CalculationDTO> getAllCaculation() {
		// TODO Auto-generated method stub
		return calculationDao.getAllCalculation();
	}

	@Override
	public calculation getCalculationById(int id) {
		// TODO Auto-generated method stub
		return calculationDao.getCalculationById(id);
	}

}
