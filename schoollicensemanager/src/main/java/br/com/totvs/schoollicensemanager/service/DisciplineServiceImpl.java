package br.com.totvs.schoollicensemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.repository.DisciplineRepository;

@Service
public class DisciplineServiceImpl implements DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;
	

	@Override
	public Page<Discipline> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.disciplineRepository.findAllByOrderById(pageRequest);
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
		return this.disciplineRepository.findByInitialsContainingIgnoreCase(name, pageRequest);
	}

	@Override
	public void delete(Long id) {
		this.disciplineRepository.deleteById(id);
	}
	
	@Override
	public Discipline addTeacher(Long id, Long teacherId) throws Exception {
		
		return null; 
	}

}
