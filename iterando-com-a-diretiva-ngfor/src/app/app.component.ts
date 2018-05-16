import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = 'Rhawan';
  adicionado = false;
  funcionarios = [];
  proximoId = 0;

  adicionar() {
    console.log(`Adicionando ${this.nome}`);
    this.adicionado = true;

    this.funcionarios.push({
      id: ++this.proximoId,
      nome: this.nome
    })

    setTimeout(() => {
      this.adicionado = false;
    }, 5000);
  }

}
