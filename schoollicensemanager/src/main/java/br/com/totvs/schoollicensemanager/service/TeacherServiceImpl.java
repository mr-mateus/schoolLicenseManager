package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService{

	@Autowired
	private TeacherRepository teacherRepository;
	
	@Override
	public List<Teacher> findAll() {
		return this.teacherRepository.findAll();
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

}
