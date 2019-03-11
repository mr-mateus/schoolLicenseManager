package br.com.totvs.schoollicensemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.repository.TeacherPagingRepository;
import br.com.totvs.schoollicensemanager.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService{

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
	public Teacher findById(Long id) {
		return this.teacherRepository.findById(id).orElse(null);
	}

	@Override
	public Teacher create(Teacher teacher) {
		return this.teacherRepository.save(teacher);
	}

	@Override
	public Teacher update(Teacher teacher) {
		return this.teacherRepository.save(teacher);
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
