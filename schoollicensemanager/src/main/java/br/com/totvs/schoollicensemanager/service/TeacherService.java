package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import br.com.totvs.schoollicensemanager.model.Teacher;

public interface TeacherService {

	public List<Teacher> findAll();

	public Teacher findById(Long id);

	public Teacher create(Teacher teacher);

	public Teacher update(Teacher teacher);

}
