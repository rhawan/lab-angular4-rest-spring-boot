package com.algamoney.api.exceptionhandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class AlgamoneyExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Autowired
	private MessageSource messageSource;
	
	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		String mensagemInvalida = messageSource.getMessage("mensagem.invalida", null, LocaleContextHolder.getLocale()) ;
		String mensagemDev = ex.getCause().toString();
		return handleExceptionInternal(ex, new Erro(mensagemInvalida, mensagemDev), headers, status, request);
	}
	
	public static class Erro {
		private String mensagemUsuario;
		private String mensagemDev;
		
		public Erro(String mensagemUsuario, String mensagemDev) {
			super();
			this.mensagemUsuario = mensagemUsuario;
			this.mensagemDev = mensagemDev;
		}
		
		public String getMensagemUsuario() {
			return mensagemUsuario;
		}
		public String getMensagemDev() {
			return mensagemDev;
		}
		
		
	}

}
