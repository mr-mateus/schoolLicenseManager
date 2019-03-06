package br.com.totvs.schoollicensemanager.model;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@MappedSuperclass
public class Person {

	@NotBlank
	private String name;
	
	@Email
	@NotBlank
	private String email;
	
	@NotBlank
	private String cpf;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

}
