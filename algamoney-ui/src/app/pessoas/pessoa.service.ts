import { environment } from './../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa, Estado, Cidade } from './../core/model';
import { MoneyHttp } from './../seguranca/money-http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(this.pessoasUrl, { params })
    .toPromise()
    .then(response => {
      const pessoas = response.content;

      const resultado = {
        pessoas: pessoas,
        total: response.totalElements
      };

      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl,
      JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => response);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,
    JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => {
      const pessoaAlterada = response;
      return pessoaAlterada;
    });
  }

  consultarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const pessoa = response;
      return pessoa;
    });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
    .toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .append('codigoEstado', estado);
    return this.http.get<Cidade[]>(this.cidadesUrl, {
      params
    }).toPromise();
  }

}
