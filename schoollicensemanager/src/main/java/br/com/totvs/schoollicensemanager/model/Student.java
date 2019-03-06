package br.com.totvs.schoollicensemanager.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotNull;

@Entity
public class Student extends Person {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String enrollment;

	@Enumerated
	@NotNull
	private StudentType studentType;

	public String getEnrollment() {
		return enrollment;
	}

	public void setEnrollment(String enrollment) {
		this.enrollment = enrollment;
	}

	public StudentType getStudentType() {
		return studentType;
	}

	public void setStudentType(StudentType studentType) {
		this.studentType = studentType;
	}

	@PrePersist
	public void prePersist() {
		this.enrollment = UUID.randomUUID().toString();
	}
}
