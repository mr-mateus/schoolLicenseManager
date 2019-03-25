package br.com.totvs.schoollicensemanager.model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Student extends Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long enrollment;

	@Enumerated
	@NotNull
	private StudentType studentType;
}
