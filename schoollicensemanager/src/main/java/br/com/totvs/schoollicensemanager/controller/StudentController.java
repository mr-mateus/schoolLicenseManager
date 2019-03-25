package br.com.totvs.schoollicensemanager.controller;

import javax.validation.Valid;

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

import br.com.totvs.schoollicensemanager.dto.StudentCreateDTO;
import br.com.totvs.schoollicensemanager.dto.StudentUpdateDTO;
import br.com.totvs.schoollicensemanager.model.PageResponseEntity;
import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@GetMapping(params = { "page", "size" })
	public PageResponseEntity<Student> findAll(@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Student>(studentService.findAll(page.toString(), size.toString()));
	}

	@GetMapping("{id}")
	public Student findById(@PathVariable("id") Long id) {
		return this.studentService.findById(id);
	}

	@GetMapping(params = { "name", "page", "size" })
	public PageResponseEntity<Student> findByNameContaining(@RequestParam("name") String name,
			@RequestParam("page") String page, @RequestParam("size") String size) {
		return new PageResponseEntity<Student>(this.studentService.findByNameContaining(name, page, size));
	}

	@PostMapping
	public Student create(@Valid @RequestBody StudentCreateDTO studentCreateDTO) {
		return this.studentService.create(studentCreateDTO.convertToEntity());
	}

	@PutMapping
	public Student update(@RequestBody StudentUpdateDTO studentUpdateDTO) {
		return this.studentService.update(studentUpdateDTO.convertToEntity());
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Long enrollment) {
		this.studentService.delete(enrollment);
	}

}
