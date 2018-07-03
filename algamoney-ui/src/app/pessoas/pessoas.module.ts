import { GrowlModule } from 'primeng/growl';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/components/common/messageservice';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,

    SharedModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  providers: [MessageService]
})
export class PessoasModule { }
