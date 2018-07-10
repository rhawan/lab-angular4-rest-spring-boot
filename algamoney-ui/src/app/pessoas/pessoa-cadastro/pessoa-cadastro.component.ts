import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Pessoas');

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

    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.consultarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.messageService.add({severity: 'success', summary: 'Pessoa adicionada com sucesso!'});

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoaAtualizada => {
      this.messageService.add({severity: 'success', summary: 'Pessoa atualizada com sucesso!'});
      this.router.navigate(['/pessoas']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
