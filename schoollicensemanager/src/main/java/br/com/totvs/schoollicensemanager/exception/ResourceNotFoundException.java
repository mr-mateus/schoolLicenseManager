package br.com.totvs.schoollicensemanager.exception;

public class ResourceNotFoundException extends RuntimeException {

	public ResourceNotFoundException() {
		super("Registro não encontrado ");
	}

}
