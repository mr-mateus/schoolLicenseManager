package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Override
	public List<Student> findAll() {
		return this.studentRepository.findAll();
	}

	@Override
	public Student findById(Long id) {
		return this.studentRepository.findById(id).orElse(null);
	}

	@Override
	public Student create(Student student) {
		return this.studentRepository.save(student);
	}

	@Override
	public Student update(Student student) {
		return this.studentRepository.save(student);
	}

}
