import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorMessage } from './model/error-message';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) { }

  handle(errorResponse: any, errorMessage: ErrorMessage) {
    let title: string = '';
    let messageInfo: string = '';

    if (errorMessage.title.length > 0) {
        title = errorMessage.title;
    } else {
        title = 'Erro interno';
    }

    if (errorMessage.messageInfo.length > 0) {
        messageInfo = errorMessage.messageInfo;
    }

    if (typeof errorResponse === 'string') {
        messageInfo = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse) {

        if (errorResponse.error.message === 'Failed to fetch'
            && errorResponse.status === 0) {
                title = 'Erro interno';
                messageInfo = 'Servidor indisponível!';
        }

        if (errorResponse.status <= 400 && errorResponse.status >= 499) {
            messageInfo = errorResponse.error.message;
            title = 'Requisição inválida!';
        }

        //console.error('Ocorreu um erro', errorResponse);
    }

    if (messageInfo !== undefined && messageInfo !== null) {
        if (errorMessage.level === 'ERROR') {
            this.toastr.error(messageInfo, title);
        }

        if (errorMessage.level === 'INFO') {
            this.toastr.info(messageInfo, title);
        }
    }
  }

}