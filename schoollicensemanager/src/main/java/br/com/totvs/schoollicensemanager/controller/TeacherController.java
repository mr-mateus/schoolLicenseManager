package br.com.totvs.schoollicensemanager.controller;

import java.util.List;

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

import br.com.totvs.schoollicensemanager.model.PageResponseEntity;
import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.service.TeacherService;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

	@Autowired
	private TeacherService teacherService;
	
	@GetMapping()
	public List<Teacher> findAll() {
		return teacherService.findAll();
	}

	@GetMapping(params = { "page", "size" })
	public PageResponseEntity<Teacher> findAll(@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Teacher>(teacherService.findAll(page, size));
	}

	@GetMapping("{id}")
	public Teacher findById(@PathVariable("id") Long id) {
		return this.teacherService.findById(id);
	}

	@GetMapping(params = { "name", "page", "size" })
	public PageResponseEntity<Teacher> findByNameContaining(@RequestParam("name") String name,
			@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Teacher>(this.teacherService.findByNameContaining(name, page, size));
	}

	@PostMapping
	public Teacher create(@RequestBody Teacher teacher) {
		return this.teacherService.create(teacher);
	}

	@PutMapping
	public Teacher update(@RequestBody Teacher teacher) {
		return this.teacherService.update(teacher);
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) {
		this.teacherService.delete(id);
	}
}
