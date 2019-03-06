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

import br.com.totvs.schoollicensemanager.model.Teacher;
import br.com.totvs.schoollicensemanager.service.TeacherService;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

	@Autowired
	private TeacherService teacherService;

	@GetMapping
	public List<Teacher> findAll() {
		return this.teacherService.findAll();
	}

	@GetMapping("{id}")
	public Teacher findById(@PathVariable("id") Long id) {
		return this.teacherService.findById(id);
	}

	@PostMapping
	public Teacher create(@RequestBody Teacher teacher) {
		return this.teacherService.create(teacher);
	}

//	@PostMapping("/id}/teachers/{teacherId}")
//	public Teacher addTeacher(@PathVariable("id") Long id, @PathVariable("teacherId") Long teacherId) throws Exception {
//		return this.teacherService.addTeacher(id, teacherId);
//	}

	@PutMapping
	public Teacher update(@RequestBody Teacher teacher) {
		return this.teacherService.update(teacher);
	}
}
