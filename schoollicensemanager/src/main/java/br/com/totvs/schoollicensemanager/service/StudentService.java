package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import br.com.totvs.schoollicensemanager.model.Student;

public interface StudentService {
	
	public List<Student> findAll();
	
	public Student findById(Long id);
	
	public Student create(Student student);
	
	public Student update(Student student);

}
