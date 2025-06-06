import { Component, Input, output, Output } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { Faturamento } from '../../core/model/faturamento';
import { ToastrService } from 'ngx-toastr';
import { FaturamentoService } from '../faturamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ErrorMessage } from '../../core/model/error-message';

@Component({
  selector: 'app-faturamento-grid',
  standalone: false,
  templateUrl: './faturamento-grid.component.html',
  styleUrl: './faturamento-grid.component.css'
})
export class FaturamentoGridComponent {

  @Input() faturamentosRecuperados!: Faturamento[];
  @Output() faturamentosParaEnvioPorEmail!: Faturamento[];
  errorMessage = new ErrorMessage();

  constructor(
    private confirmation: ConfirmationService,
    private toastr: ToastrService,
    private faturamentoService: FaturamentoService,
    private errorHandler: ErrorHandlerService
  ) { }

  confirmarExclusao(faturamentoCode: any) {
    this.confirmation.confirm({
      message: 'Deseja confirmar a exclusão?',
      accept: () => {
        this.excluir(faturamentoCode);
      }
    });
  }

  excluir(code: number) {
    this.faturamentoService.excluir(code)
    .then(() => {
      this.showSuccess('Faturamento excluído com sucesso!', 'Ação efetuada');
      this.listarTodos();
    })
    .catch(erro => {
      this.errorMessage.messageInfo = 'Falho ao excluir faturamento.';
      this.errorMessage.level = 'ERROR';
      this.errorHandler.handle(erro, this.errorMessage);
    });
  }

  listarTodos() {
    this.faturamentoService.listar()
      .then((faturamentos) => {
        if (faturamentos) {
          this.faturamentosRecuperados = faturamentos;
        } else {
          this.faturamentosRecuperados = [];
        }
      });
  }

  addFaturamentoParaEnvio(faturamento: Faturamento) {

    if (undefined === this.faturamentosParaEnvioPorEmail) {
      this.faturamentosParaEnvioPorEmail = [];
    }

    if (!this.faturamentosParaEnvioPorEmail.includes(faturamento)) {
      this.faturamentosParaEnvioPorEmail.push(faturamento);

    } else if (this.faturamentosParaEnvioPorEmail.includes(faturamento)) {
      this.faturamentosParaEnvioPorEmail.splice(this.faturamentosParaEnvioPorEmail.indexOf(faturamento), 1);
    }
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }
}
