package br.com.totvs.schoollicensemanager.service;

import org.springframework.data.domain.Page;

import br.com.totvs.schoollicensemanager.model.Student;

public interface StudentService {

	public Page<Student> findAll(String page, String size);

	public Student findById(Long id);

	public Student create(Student student);

	public Student update(Student student);

	public Page<Student> findByNameContaining(String name, String page, String size);

	public void delete(Long enrollment);


}
