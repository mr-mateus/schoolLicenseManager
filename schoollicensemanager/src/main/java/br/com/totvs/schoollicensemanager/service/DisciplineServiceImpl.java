package br.com.totvs.schoollicensemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.repository.DisciplinePagingRepository;
import br.com.totvs.schoollicensemanager.repository.DisciplineRepository;

@Service
public class DisciplineServiceImpl implements DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;
	
	@Autowired
	private DisciplinePagingRepository disciplinePagingRepository;

	@Override
	public Page<Discipline> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.disciplinePagingRepository.findAllByOrderById(pageRequest);
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
	public Page<Discipline> findByInitialsContaining(String name, String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.disciplinePagingRepository.findByInitialsContainingIgnoreCase(name, pageRequest);
	}

	@Override
	public void delete(Long id) {
		this.disciplineRepository.deleteById(id);
	}
	
	@Override
	public Discipline addTeacher(Long id, Long teacherId) throws Exception {
		/*if (!this.disciplineRepository.existsById(id)) {
			throw new Exception("Discipline: " + id + " not found");
		}
		if (!disciplineRepository.existsById(teacherId)) {
			throw new Exception("Discipline: " + id + " not found");
		}

		Discipline discipline = disciplineRepository.findById(id).get();
		Teacher teacher = disciplineRepository.findById(teacherId).get();
		discipline.setTeacher(teacher);*/
		//return disciplineRepository.save(discipline);
		return null; 
	}

}
