import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Rhawan Brenner', cidade: 'Goiânia', estado: 'GO', ativo: true},
    { nome: 'João Silva', cidade: 'João Pessoa', estado: 'PB', ativo: false},
    { nome: 'Luke Skywalker', cidade: 'São Paulo', estado: 'SP', ativo: true},
    { nome: 'Darth Vader', cidade: 'Teresina', estado: 'PI', ativo: true},
    { nome: 'Robocop', cidade: 'Porto Alegre', estado: 'RS', ativo: true}
  ];

}
