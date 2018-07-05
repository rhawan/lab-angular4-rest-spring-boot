import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Lancamento } from './../../core/model';
import { LancamentoService } from './../lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt_BR: any;
  tipos;
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
    };

    this.tipos = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' }
    ];

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
    .then(() => {
      this.messageService.add({severity: 'success', summary: 'Lançamento adicionado com sucesso!'});

      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => {
        return {label: `${c.codigo} - ${c.nome}`,
                value: c.codigo};
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => {
        return {label: `${p.codigo} - ${p.nome}`,
                value: p.codigo};
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
