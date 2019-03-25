package br.com.totvs.schoollicensemanager.dto;

import org.modelmapper.ModelMapper;

public interface DTO<T, K> {
	final ModelMapper modelMapper = new ModelMapper();
	public T convertToEntity();
	public K convertToDTO(T object);
}
