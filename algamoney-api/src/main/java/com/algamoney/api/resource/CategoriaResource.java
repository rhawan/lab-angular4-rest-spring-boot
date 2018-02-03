package com.algamoney.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algamoney.api.event.RecursoCriadoEvent;
import com.algamoney.api.model.Categoria;
import com.algamoney.api.repository.CategoriaRepository;

@RestController
@RequestMapping("/categorias")
public class CategoriaResource {
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private ApplicationEventPublisher publisher;

	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('read')")
	@GetMapping
	public List<Categoria> listar() {
		return categoriaRepository.findAll();
	}
	
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_CATEGORIA') and #oauth2.hasScope('write')")
	@PostMapping
	public ResponseEntity<Categoria> criar(@Valid @RequestBody Categoria categoria, HttpServletResponse response) {
		Categoria categoriaSalva = categoriaRepository.save(categoria);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, categoriaSalva.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(categoriaSalva);
	}
	
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('read')")
	@GetMapping("/{codigo}")
	public ResponseEntity<?> consultarPorCodigo(@PathVariable Long codigo) {
		Categoria categoria = categoriaRepository.findOne(codigo);
		return categoria != null ? ResponseEntity.ok(categoria) : ResponseEntity.notFound().build();
		
	}

}