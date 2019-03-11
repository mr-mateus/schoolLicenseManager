package br.com.totvs.schoollicensemanager.model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Student extends Person {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long enrollment;

	@Enumerated
	@NotNull
	private StudentType studentType;

	public Long  getEnrollment() {
		return enrollment;
	}

	public void setEnrollment(Long enrollment) {
		this.enrollment = enrollment;
	}

	public StudentType getStudentType() {
		return studentType;
	}

	public void setStudentType(StudentType studentType) {
		this.studentType = studentType;
	}
}
