import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent {

  constructor(private funcionarioService: FuncionarioService) {
  }

  adicionar(nome: string) {
    this.funcionarioService.adicionar(nome);
  }

}
