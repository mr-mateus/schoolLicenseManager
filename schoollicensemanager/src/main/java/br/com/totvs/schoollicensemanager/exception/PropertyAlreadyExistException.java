package br.com.totvs.schoollicensemanager.exception;

public class PropertyAlreadyExistException extends RuntimeException {
	
	public PropertyAlreadyExistException(String property) {
		super(String.format("%s já está sendo utilizado", property));
	}
}
