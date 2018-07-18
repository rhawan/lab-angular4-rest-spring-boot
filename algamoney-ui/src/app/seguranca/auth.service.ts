import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  jwtPayload: any;

  constructor(
    private http: HttpClient
  ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.access_token);
    })
    .catch(response => {
      if (response.status === 400) {
        const responseJson = response.json();

        if (responseJson.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }
      return Promise.reject(response);
    });
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private armazenarToken(token: string) {
    const jwtHelper = new JwtHelperService();
    this.jwtPayload = jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
