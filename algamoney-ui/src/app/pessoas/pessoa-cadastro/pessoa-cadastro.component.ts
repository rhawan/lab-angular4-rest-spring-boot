import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cidades;
  estados;
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

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

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.messageService.add({severity: 'success', summary: 'Pessoa adicionada com sucesso!'});

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
