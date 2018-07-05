import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  loading: boolean;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') tabela;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) {}

  aoMudarPagina(event: LazyLoadEvent) {
    this.loading = true;
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
      this.loading = false;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      if (this.tabela.first === 0) {
        this.pesquisar();
      } else {
        this.tabela.first = 0;
      }

      this.messageService.add({severity: 'success', summary: 'Pessoa excluída com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.alterarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';
      pessoa.ativo = novoStatus;

      this.messageService.add({severity: 'success', summary: `Pessoa ${acao} com sucesso!`});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
