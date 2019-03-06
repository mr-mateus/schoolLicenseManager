package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import br.com.totvs.schoollicensemanager.model.Discipline;

public interface DisciplineService {
	
	Discipline findById(Long id);

	List<Discipline> findAll();

	Discipline create(Discipline discipline);
	
	Discipline update(Discipline discipline);

	Discipline addTeacher(Long id, Long teacherId) throws Exception;

}
