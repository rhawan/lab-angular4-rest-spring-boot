import { environment } from './../../environments/environment';
import { Injectable, Input } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Lancamento } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  pesquisar(filtro: LancamentoFiltro) {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params: params })
    .toPromise()
    .then(response => {
      const lancamentos = response.content;

      const resultado = {
        lancamentos,
        total: response.totalElements
      };

      return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);

  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl,
      JSON.stringify(lancamento), { headers })
    .toPromise()
    .then(response => response as Lancamento);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
    JSON.stringify(lancamento), { headers })
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response as Lancamento;
      this.converterStringsParaDatas([lancamentoAlterado]);
      return lancamentoAlterado;
    });
  }

  consultarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response;
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
