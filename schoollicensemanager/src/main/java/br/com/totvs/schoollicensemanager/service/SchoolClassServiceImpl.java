package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.SchoolClass;
import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.repository.SchoolClassPagingRepository;
import br.com.totvs.schoollicensemanager.repository.SchoolClassRepository;

@RestController
@RequestMapping("/schoolClasses")
public class SchoolClassServiceImpl implements SchoolClassService {

	@Autowired
	private SchoolClassRepository schoolClassRepository;

	@Autowired
	private SchoolClassPagingRepository schoolClassPagingRepository;

	@Override
	public List<SchoolClass> findAll() {
		return schoolClassRepository.findAll();
	}

	@Override
	public Page<SchoolClass> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return schoolClassPagingRepository.findAll(pageRequest);
	}

	@Override
	public SchoolClass findById(Long id) {
		return schoolClassRepository.findById(id).orElse(null);
	}

	@Override
	public Page<SchoolClass> findByDescriptionContaining(String description, String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.schoolClassPagingRepository.findByDescriptionContainingIgnoreCase(description, pageRequest);
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
