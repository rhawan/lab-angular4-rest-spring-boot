package com.algamoney.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.algamoney.api.dto.LancamentoEstatisticaCategoria;
import com.algamoney.api.dto.LancamentoEstatisticaDia;
import com.algamoney.api.dto.LancamentoEstatisticaPessoa;
import com.algamoney.api.model.Lancamento;
import com.algamoney.api.repository.filter.LancamentoFilter;
import com.algamoney.api.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {
	
	Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	
	Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
	List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia);
	
	List<LancamentoEstatisticaDia> porDia(LocalDate mesReferencia);
	
	List<LancamentoEstatisticaPessoa> porPessoa(LocalDate inicio, LocalDate fim);

}
