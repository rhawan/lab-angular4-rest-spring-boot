import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(response => response);
  }
}
