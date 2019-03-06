package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.SchoolClass;
import br.com.totvs.schoollicensemanager.repository.SchoolClassRepository;

@RestController
@RequestMapping("/schoolClasses")
public class SchoolClassServiceImpl implements SchoolClassService{
	
	@Autowired
	private SchoolClassRepository schoolClassRepository;
	
	@Override
	public List<SchoolClass> findAll() {
		return schoolClassRepository.findAll();
	}

	@Override
	public SchoolClass findById(Long id) {
		return schoolClassRepository.findById(id).orElse(null);
	}

	@Override
	public SchoolClass create(SchoolClass schoolClass) {
		return schoolClassRepository.save(schoolClass);
	}

	@Override
	public SchoolClass update(SchoolClass schoolClass) {
		return schoolClassRepository.save(schoolClass);
	}

}
