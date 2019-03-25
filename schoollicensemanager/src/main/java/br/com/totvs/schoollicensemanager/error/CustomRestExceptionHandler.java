package br.com.totvs.schoollicensemanager.error;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.totvs.schoollicensemanager.translate.Translator;

@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		logger.info(ex.getClass().getName());
		logger.error("error", ex);

		BindingResult result = ex.getBindingResult();
		List<FieldError> fieldErrors = result.getFieldErrors();
		List<TotvsError> totvsErrors = new ArrayList<TotvsError>();
		fieldErrors.forEach(error -> {

			totvsErrors.add(TotvsError
					.builder()
					.code(error.getCode())
					.field(Translator.toLocale(error.getField()))
					.message(Translator.toLocale(error.getCode()))
					.build());
		});
		TotvsError totvsError = TotvsError.builder().code("EntityIntegrity")
				.message(Translator.toLocale("entityIntegrity")).details(totvsErrors).build();
		return new ResponseEntity<Object>(totvsError, HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		logger.info(ex.getClass().getName());
		logger.error("error", ex);
		TotvsError totvsError = TotvsError.builder().code("RequiredRequestBody").message(Translator.toLocale("RequiredRequestBody")).build();
		return new ResponseEntity<Object>(totvsError, HttpStatus.BAD_REQUEST);
	}

}
