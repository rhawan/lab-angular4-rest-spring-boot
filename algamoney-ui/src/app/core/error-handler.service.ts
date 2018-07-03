import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (errorResponse instanceof Response
    && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.log('Ocorreu um erro', errorResponse);
    } else if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: msg});

  }
}
