import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = 'Rhawan';
  adicionado = false;

  adicionar() {
    console.log(`Adicionando ${this.nome}`);
    this.adicionado = true;

    setTimeout(() => {
      this.adicionado = false;
    }, 5000);
  }

}
