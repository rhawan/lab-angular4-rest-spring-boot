import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FuncionarioModule } from './funcionario/funcionario.module';
import { AppComponent } from './app.component';
import { CampoColoridoDirective } from './campo-colorido.directive';
import { LogService } from './log.service';
import { FuncionarioCardComponent } from './funcionario/funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CampoColoridoDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FuncionarioModule
  ],
  providers: [
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
