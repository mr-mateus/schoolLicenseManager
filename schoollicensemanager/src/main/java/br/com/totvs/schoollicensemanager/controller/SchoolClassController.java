package br.com.totvs.schoollicensemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import br.com.totvs.schoollicensemanager.model.SchoolClass;
import br.com.totvs.schoollicensemanager.service.SchoolClassService;

@RestController
@RequestMapping("/schoolClasses")
public class SchoolClassController {
	@Autowired
	private SchoolClassService schoolClassService;

	@GetMapping
	public List<SchoolClass> findAll() {
		return this.schoolClassService.findAll();
	}
	
	@GetMapping(params = { "page", "size" })
	public PageResponseEntity<SchoolClass> findAll(@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<SchoolClass>(schoolClassService.findAll(page.toString(), size.toString()));
	}
	
	@GetMapping(params = { "description", "page", "size" })
	public PageResponseEntity<SchoolClass> findByDescriptionContaining(@RequestParam("description") String description, @RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<SchoolClass>(this.schoolClassService.findByDescriptionContaining(description, page, size));
	}
	

	@GetMapping("{id}")
	public SchoolClass findById(@PathVariable("id") Long id) {
		return this.schoolClassService.findById(id);
	}

	@PostMapping
	public SchoolClass create(@RequestBody SchoolClass schoolClass) {
		return this.schoolClassService.create(schoolClass);
	}

	@PutMapping
	public SchoolClass update(@RequestBody SchoolClass schoolClass) {
		return this.schoolClassService.update(schoolClass);
	}
	
	
}
