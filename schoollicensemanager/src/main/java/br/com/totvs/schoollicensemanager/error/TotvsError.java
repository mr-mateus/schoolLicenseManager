package br.com.totvs.schoollicensemanager.error;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotvsError {
		
	private String code;
		
	private String message;
	
	private String field;
	
	private String detailedMessage;
	
	private String helpUrl;
	
	private List<TotvsError> details;
}
