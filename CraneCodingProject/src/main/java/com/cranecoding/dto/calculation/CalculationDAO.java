package com.cranecoding.dto.calculation;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.calculation;

public interface CalculationDAO extends CrudRepository<calculation, Integer>  {
	
	@Query (value = "select idcalculation, calculationname from calculation", nativeQuery = true)
	List<CalculationDTO> getAllCalculation();
	
	@Query(value ="select * from calculation where idcalculation = :idcalculation", nativeQuery = true)
	calculation getCalculationById(@Param("idcalculation") int idcalculation);
}
