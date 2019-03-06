package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.repository.DisciplineRepository;
import br.com.totvs.schoollicensemanager.repository.TeacherRepository;

@Service
public class DisciplineServiceImpl implements DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;

	@Autowired
	private TeacherRepository teacherRepository;

	@Override
	public List<Discipline> findAll() {
		return this.disciplineRepository.findAll();
	}

	@Override
	public Discipline findById(Long id) {
		return this.disciplineRepository.findById(id).orElse(null);
	}

	@Override
	public Discipline create(Discipline discipline) {
		return this.disciplineRepository.save(discipline);
	}

	@Override
	public Discipline update(Discipline discipline) {
		return this.disciplineRepository.save(discipline);
	}

	@Override
	public Discipline addTeacher(Long id, Long teacherId) throws Exception {
		if (!this.disciplineRepository.existsById(id)) {
			throw new Exception("Discipline: " + id + " not found");
		}
		if (!teacherRepository.existsById(teacherId)) {
			throw new Exception("Teacher: " + id + " not found");
		}

		Discipline discipline = disciplineRepository.findById(id).get();
		Teacher teacher = teacherRepository.findById(teacherId).get();
		discipline.setTeacher(teacher);
		return disciplineRepository.save(discipline);
	}
}
