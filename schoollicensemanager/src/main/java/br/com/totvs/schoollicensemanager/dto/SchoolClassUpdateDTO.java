package br.com.totvs.schoollicensemanager.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.totvs.schoollicensemanager.model.Discipline;
import br.com.totvs.schoollicensemanager.model.SchoolClass;
import br.com.totvs.schoollicensemanager.model.Student;
import lombok.Data;

@Data
public class SchoolClassUpdateDTO implements DTO<SchoolClass, SchoolClassUpdateDTO>{

	@NotBlank 
	private Long id;
	
	@NotBlank
	private String description;

	@NotNull
	private Integer year;

	@NotNull
	private Integer period;

	@NotNull
	private Integer vacancies;
	
	@NotNull
	private Integer remainingVacancies;

	private List<Discipline> disciplines = new ArrayList<>();

	private List<Student> students = new ArrayList<>();

	@Override
	public SchoolClass convertToEntity() {
		return modelMapper.map(this, SchoolClass.class);
	}

	@Override
	public SchoolClassUpdateDTO convertToDTO(SchoolClass schoolClass) {
		return modelMapper.map(schoolClass, SchoolClassUpdateDTO.class);
	}
}
