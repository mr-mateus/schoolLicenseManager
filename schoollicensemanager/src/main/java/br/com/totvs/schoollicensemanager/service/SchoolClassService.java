package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import br.com.totvs.schoollicensemanager.model.SchoolClass;

public interface SchoolClassService {

	public List<SchoolClass> findAll();
	
	public SchoolClass findById(Long id);
	
	public SchoolClass create(SchoolClass schoolClass);
	
	public SchoolClass update(SchoolClass schoolClass);
}
