package br.com.totvs.schoollicensemanager.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class SchoolClass {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private String description;
	@NotNull
	private Integer year;
	@NotNull
	private Integer period;
	@NotNull
	private Integer vacancies;

	@ManyToMany(fetch = FetchType.EAGER)
	private List<Discipline> disciplines = new ArrayList<>();

	@ManyToMany
	private List<Student> students = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getPeriod() {
		return period;
	}

	public void setPeriod(Integer period) {
		this.period = period;
	}

	public Integer getVacancies() {
		return vacancies;
	}

	public void setVacancies(Integer vacancies) {
		this.vacancies = vacancies;
	}

	public List<Discipline> getDisciplines() {
		return disciplines;
	}

	public void setDisciplines(List<Discipline> disciplines) {
		this.disciplines = disciplines;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}

}
