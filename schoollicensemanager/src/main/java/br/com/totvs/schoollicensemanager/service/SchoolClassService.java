package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.data.domain.Page;

import br.com.totvs.schoollicensemanager.model.SchoolClass;

public interface SchoolClassService {

	public List<SchoolClass> findAll();
	
	public SchoolClass findById(Long id);
	
	public Page<SchoolClass> findByDescriptionContaining(String description, String page, String size);
	
	public SchoolClass create(SchoolClass schoolClass);
	
	public SchoolClass update(SchoolClass schoolClass);
	
	public void deleteById(Long id);

	public Page<SchoolClass> findAll(String string, String string2);

}
