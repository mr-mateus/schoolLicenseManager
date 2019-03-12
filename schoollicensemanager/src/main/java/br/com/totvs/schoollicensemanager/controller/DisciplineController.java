package br.com.totvs.schoollicensemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.model.PageResponseEntity;
import br.com.totvs.schoollicensemanager.service.DisciplineService;

@RestController 
@RequestMapping("/disciplines")
public class DisciplineController {

	@Autowired
	private DisciplineService disciplineService;

	@GetMapping(params = { "page", "size" })
	public PageResponseEntity<Discipline> findAll(@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Discipline>(this.disciplineService.findAll(page, size));
	}
	
	@GetMapping(params = { "name", "page", "size" })
	public PageResponseEntity<Discipline> findByNameContaining(@RequestParam("name") String name, @RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Discipline>(this.disciplineService.findByInitialsContaining(name, page, size));
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
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		this.disciplineService.delete(id);
	}
}
