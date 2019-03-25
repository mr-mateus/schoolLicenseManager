package br.com.totvs.schoollicensemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.SchoolClass;
import br.com.totvs.schoollicensemanager.repository.SchoolClassRepository;

@RestController
@RequestMapping("/schoolClasses")
public class SchoolClassServiceImpl implements SchoolClassService {

	@Autowired
	private SchoolClassRepository schoolClassRepository;

	@Override
	public List<SchoolClass> findAll() {
		return schoolClassRepository.findAll();
	}

	@Override
	public Page<SchoolClass> findAll(String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return schoolClassRepository.findAll(pageRequest);
	}

	@Override
	public SchoolClass findById(Long id) {
		return schoolClassRepository.findById(id).orElse(null);
	}

	@Override
	public Page<SchoolClass> findByDescriptionContaining(String description, String page, String size) {
		Pageable pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
		return this.schoolClassRepository.findByDescriptionContainingIgnoreCase(description, pageRequest);
	}

	@Override
	public SchoolClass create(SchoolClass schoolClass) {
		schoolClass.setRemainingVacancies(schoolClass.getVacancies() - schoolClass.getStudents().size());
		validate(schoolClass);
		return schoolClassRepository.save(schoolClass);
	}

	@Override
	public SchoolClass update(SchoolClass schoolClass) {
		schoolClass.setRemainingVacancies(schoolClass.getVacancies() - schoolClass.getStudents().size());
		validate(schoolClass);
		return schoolClassRepository.save(schoolClass);
	}

	@Override
	public void deleteById(Long id) {
		this.schoolClassRepository.deleteById(id);
	}

	private void validate(SchoolClass schoolClass) {

		if (schoolClass.getStudents() != null && schoolClass.getStudents().size() > 0
				&& schoolClass.getStudents().size() > schoolClass.getRemainingVacancies()) {
			throw new Error("Número de vagas da turma não comporta esse número de alunos");
		}
	}

}
