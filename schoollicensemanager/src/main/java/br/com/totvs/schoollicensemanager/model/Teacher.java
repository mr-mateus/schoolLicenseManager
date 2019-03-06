package br.com.totvs.schoollicensemanager.model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Teacher extends Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated
	@NotNull
	private AcademicDegree academicDegree;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AcademicDegree getAcademicDegree() {
		return this.academicDegree;
	}

	public void setAcedemicDegree(AcademicDegree academicDegree) {
		this.academicDegree = academicDegree;
	}

}
