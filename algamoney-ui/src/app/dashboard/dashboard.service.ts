import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<any>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
    .toPromise()
    .then(response => response);
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<any>(`${this.lancamentosUrl}/estatisticas/por-dia`)
    .toPromise()
    .then(response => {
      const dados = response;
      this.converterStringParaDatas(dados);

      return dados;
    });
  }

  private converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
