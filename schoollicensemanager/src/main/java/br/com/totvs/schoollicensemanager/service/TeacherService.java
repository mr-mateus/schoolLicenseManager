package br.com.totvs.schoollicensemanager.service;

import org.springframework.data.domain.Page;

import br.com.totvs.schoollicensemanager.model.Teacher;

public interface TeacherService {

	public Page<Teacher> findAll(String page, String size);

	public Teacher findById(Long id);

	public Teacher create(Teacher teacher);

	public Teacher update(Teacher teacher);
	
	public Page<Teacher> findByNameContaining(String name, String page, String size);
	
	public void delete(Long id);

}
