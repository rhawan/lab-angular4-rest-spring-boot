import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cidades;
  estados;

  constructor() { }

  ngOnInit() {
    this.cidades = [
      { label: 'Goiânia', value: 'GOIANIA' },
      { label: 'São Paulo', value: 'SAO_PAULO' },
      { label: 'Rio de Janeiro', value: 'RIO_DE_JANEIRO' }
    ];

    this.estados = [
      { label: 'GO', value: 'GO' },
      { label: 'SP', value: 'SP' },
      { label: 'RJ', value: 'RJ' }
    ];
  }

}
