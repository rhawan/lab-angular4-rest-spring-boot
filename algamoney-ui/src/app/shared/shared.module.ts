import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GrowlModule} from 'primeng/growl';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent, GrowlModule]
})
export class SharedModule { }
