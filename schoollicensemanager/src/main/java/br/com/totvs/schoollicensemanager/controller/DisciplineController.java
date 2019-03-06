package br.com.totvs.schoollicensemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.service.DisciplineService;

@RestController
@RequestMapping("/disciplines")
public class DisciplineController {

	@Autowired
	private DisciplineService disciplineService;

	@GetMapping
	public List<Discipline> findAll() {
		return this.disciplineService.findAll();
	}

	@GetMapping("{id}")
	public Discipline findById(@PathVariable("id") Long id) {
		return this.disciplineService.findById(id);
	}

	@PostMapping
	public Discipline create(@RequestBody Discipline discipline) {
		return this.disciplineService.create(discipline);
	}

	@PostMapping("/{id}/teachers/{teacherId}")
	public Discipline addTeacher(@PathVariable("id") Long id, @PathVariable("teacherId") Long teacherId) throws Exception {
		return this.disciplineService.addTeacher(id, teacherId);
	}

	@PutMapping
	public Discipline update(@RequestBody Discipline discipline) {
		return this.disciplineService.update(discipline);
	}
}
