import { Component, Input } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { Faturamento } from '../../core/model/faturamento';
import { ToastrService } from 'ngx-toastr';
import { FaturamentoService } from '../faturamento.service';

@Component({
  selector: 'app-faturamento-grid',
  standalone: false,
  templateUrl: './faturamento-grid.component.html',
  styleUrl: './faturamento-grid.component.css'
})
export class FaturamentoGridComponent {

  @Input() faturamentosRecuperados!: Faturamento[];

  constructor(
    private confirmation: ConfirmationService,
    private toastr: ToastrService,
    private faturamentoService: FaturamentoService
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
    .catch(erro => this.showError('Erro interno: ' + erro, 'Falho ao excluir faturamento.'));
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

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }
}
