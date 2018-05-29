import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent {
  nome = 'Rhawan';
  adicionado = false;
  proximoId = 0;
  @Output('funcionarioCriado') funcionarioAdicionadoEvent = new EventEmitter();

  adicionar() {
    this.adicionado = true;

    const funcionario = {
      id: ++this.proximoId,
      nome: this.nome
    };

    this.funcionarioAdicionadoEvent.emit(funcionario);
  }

}
