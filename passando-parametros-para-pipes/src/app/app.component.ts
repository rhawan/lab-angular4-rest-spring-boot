import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = 'Rhawan Brenner';
  dataAniversario = new Date(1992, 0, 25);
  preco = 12855.32;
  troco = 0.57392;
}
