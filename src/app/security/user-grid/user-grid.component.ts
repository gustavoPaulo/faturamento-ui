import { Component, Input } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { ToastrService } from 'ngx-toastr';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-user-grid',
  standalone: false,
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.css'
})
export class UserGridComponent {

  @Input() usuariosRecuperados!: UserRegister[];

  constructor(
    private confirmation: ConfirmationService,
    private toastr: ToastrService,
    private userRegisterService: SecurityService
  ) { }

  confirmarExclusao(userCode: any) {
    this.confirmation.confirm({
      message: 'Deseja confirmar a exclusão?',
      accept: () => {
        this.excluir(userCode);
      }
    });
  }

  excluir(code: number) {
    this.userRegisterService.excluir(code)
    .then(() => {
      this.showSuccess('Usuário excluído com sucesso!', 'Ação efetuada');
      this.listarTodos();
    })
    .catch(erro => this.showError('Erro interno: ' + erro, 'Falho ao excluir usuário.'));
  }

  listarTodos() {
    this.userRegisterService.pesquisar()
      .then((usuarios) => {
        if (usuarios) {
          this.usuariosRecuperados = usuarios;
        } else {
          this.usuariosRecuperados = [];
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
