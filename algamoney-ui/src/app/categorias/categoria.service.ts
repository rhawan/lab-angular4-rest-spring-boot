import { Injectable } from '@angular/core';

import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: MoneyHttp) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(response => response);
  }
}
