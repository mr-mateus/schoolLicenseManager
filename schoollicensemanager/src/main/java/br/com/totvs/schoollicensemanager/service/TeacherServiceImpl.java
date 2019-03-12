package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.exception.PropertyAlreadyExistException;
import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.repository.TeacherPagingRepository;
import br.com.totvs.schoollicensemanager.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	private TeacherRepository teacherRepository;

	@Autowired
	private TeacherPagingRepository teacherPagingRepository;

	@Override
	public Page<Teacher> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.teacherPagingRepository.findAll(pageRequest);
	}

	@Override
	public List<Teacher> findAll() {
		return teacherRepository.findAll();
	}

	@Override
	public Teacher findById(Long id) {
		return this.teacherRepository.findById(id).orElse(null);
	}

	@Override
	public Teacher create(Teacher teacher) {
		validateCreateTeacher(teacher);
		return this.teacherRepository.save(teacher);
	}

	@Override
	public Teacher update(Teacher teacher) {
		validateUpdateTeacher(teacher);
		return this.teacherRepository.save(teacher);
	}

	private void validateCreateTeacher(Teacher teacher) {
		if (this.teacherRepository.existsByEmail(teacher.getEmail())) {
			throw new PropertyAlreadyExistException("Email");
		}
		if (this.teacherRepository.existsByCpf(teacher.getCpf())) {
			throw new PropertyAlreadyExistException("CPF");
		}
	}

	private void validateUpdateTeacher(Teacher teacher) {
		if (this.teacherRepository.existsByEmailAndIdIsNotIn(teacher.getEmail(), teacher.getId())) {
			throw new PropertyAlreadyExistException("Email");
		}
		if (this.teacherRepository.existsByCpfAndIdIsNotIn(teacher.getCpf(), teacher.getId())) {
			throw new PropertyAlreadyExistException("CPF");
		}
	}

	@Override
	public Page<Teacher> findByNameContaining(String name, String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.teacherPagingRepository.findByNameContainingIgnoreCase(name, pageRequest);
	}

	@Override
	public void delete(Long id) {
		this.teacherRepository.deleteById(id);

	}

}
