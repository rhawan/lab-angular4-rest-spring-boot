import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import {GrowlModule} from 'primeng/growl';

import { NavbarComponent } from './navbar/navbar.component';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    ConfirmDialogModule,
    GrowlModule
  ],
  declarations: [NavbarComponent],
  providers: [
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    GrowlModule
  ]
})
export class CoreModule { }
