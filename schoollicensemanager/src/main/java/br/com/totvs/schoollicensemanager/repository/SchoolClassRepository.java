package br.com.totvs.schoollicensemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.totvs.schoollicensemanager.model.SchoolClass;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long>{
	
	

}
