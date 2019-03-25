package br.com.totvs.schoollicensemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.exception.PropertyAlreadyExistException;
import br.com.totvs.schoollicensemanager.exception.ResourceNotFoundException;
import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Override
	public Student findById(Long id) {
		return this.studentRepository.findById(id).orElse(null);
	}

	@Override
	public Student create(Student student) {
		validateCreateStudent(student);
		return this.studentRepository.save(student);
	}

	@Override
	public Student update(Student student) {
		validateUpdateStudent(student);
		if (student.getEnrollment() != null && this.studentRepository.existsById(student.getEnrollment())) {
			return this.studentRepository.save(student);
		}
		throw new ResourceNotFoundException();

	}

	@Override
	public Page<Student> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.studentRepository.findAllByOrderByEnrollment(pageRequest);

	}

	private void validateCreateStudent(Student student) {
		if (this.studentRepository.existsByEmail(student.getEmail())) {
			throw new PropertyAlreadyExistException("Email");
		}
		if (this.studentRepository.existsByCpf(student.getCpf())) {
			throw new PropertyAlreadyExistException("CPF");
		}
	}

	private void validateUpdateStudent(Student student) {
		if (this.studentRepository.existsByEmailAndEnrollmentIsNotIn(student.getEmail(), student.getEnrollment())) {
			throw new PropertyAlreadyExistException("Email");
		}
		if (this.studentRepository.existsByCpfAndEnrollmentIsNotIn(student.getCpf(), student.getEnrollment())) {
			throw new PropertyAlreadyExistException("CPF");
		}
	}

	@Override
	public Page<Student> findByNameContaining(String name, String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.studentRepository.findByNameContainingIgnoreCase(name, pageRequest);
	}

	@Override
	public void delete(Long enrollment) {
		this.studentRepository.deleteById(enrollment);
	}

}
