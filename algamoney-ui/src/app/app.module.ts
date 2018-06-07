import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {TableModule} from 'primeng/table';
import {TooltipModule, Tooltip} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';

import { AppComponent } from './app.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    LancamentoCadastroComponent,
    PessoaCadastroComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
