package br.com.totvs.schoollicensemanager.dto;

import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.totvs.schoollicensemanager.model.Student;
import br.com.totvs.schoollicensemanager.model.StudentType;
import lombok.Data;

@Data
public class StudentCreateDTO implements DTO<Student, StudentCreateDTO> {

	@NotBlank
	private String name;

	@Email
	@NotBlank
	private String email;

	@NotBlank
	private String cpf;

	@Enumerated
	@NotNull
	private StudentType studentType;

	@Override
	public Student convertToEntity() {
		return modelMapper.map(this, Student.class);
	}

	@Override
	public StudentCreateDTO convertToDTO(Student student) {
		return modelMapper.map(student, StudentCreateDTO.class);
	}
}
