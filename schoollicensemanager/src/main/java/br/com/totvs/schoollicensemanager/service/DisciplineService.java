package br.com.totvs.schoollicensemanager.service;

import org.springframework.data.domain.Page;

import br.com.totvs.schoollicensemanager.model.Discipline;

public interface DisciplineService {
	
	Discipline findById(Long id);

	Page<Discipline> findAll(String page, String size);

	Discipline create(Discipline discipline);
	
	Discipline update(Discipline discipline);

	Discipline addTeacher(Long id, Long teacherId) throws Exception;

	Page<Discipline> findByInitialsContaining(String name, String page, String size);

	void delete(Long id);

}
