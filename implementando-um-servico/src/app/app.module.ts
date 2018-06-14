import { FuncionarioService, FuncionarioAbreviadoService } from './funcionario.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { CampoColoridoDirective } from './campo-colorido.directive';

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioCardComponent,
    FuncionarioFormComponent,
    CampoColoridoDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  // Esta implementacao equivale a 2 implementacao
  // providers: [FuncionarioService],
  providers: [
    { provide: FuncionarioService, useClass: FuncionarioAbreviadoService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
