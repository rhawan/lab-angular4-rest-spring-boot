package com.algamoney.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.algamoney.api.model.Pessoa;
import com.algamoney.api.repository.filter.PessoaFilter;

public interface PessoaRepositoryQuery {
	
	Page<Pessoa> filtrar(PessoaFilter pessoaFilter, Pageable pageable);

}
