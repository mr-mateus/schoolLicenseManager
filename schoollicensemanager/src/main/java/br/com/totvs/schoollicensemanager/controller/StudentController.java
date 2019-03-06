package br.com.totvs.schoollicensemanager.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@GetMapping
	public List<Student> findAll() {
		return this.studentService.findAll();
	}
	
	
	@GetMapping("{id}")
	public Student findById(@PathVariable("id") Long id) {
		return this.studentService.findById(id);
	}
	
	@PostMapping
	public Student create(@Valid @RequestBody Student student) {
		return this.studentService.create(student);
	}
	
	@PutMapping
	public Student update(@RequestBody Student student) {
		return this.studentService.update(student);
	}
}
