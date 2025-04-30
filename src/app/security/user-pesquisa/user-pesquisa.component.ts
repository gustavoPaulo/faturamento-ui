import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-user-pesquisa',
  standalone: false,
  templateUrl: './user-pesquisa.component.html',
  styleUrl: './user-pesquisa.component.css'
})
export class UserPesquisaComponent implements OnInit {

  options: any[] = [
    {label: 'Todos', value: 'TODOS'},
    {label: 'Padrão', value: 'DEFAULT'},
    {label: 'Administrador', value: 'ADMIN'}
  ];

  usersRegister = new UserRegister();
  errorMessage = new ErrorMessage();
  @Input() usuariosRecuperados!: UserRegister[];

  constructor(
    private title: Title,
    private userRegisterService: SecurityService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Consulta');
    this.pesquisar();
    this.usersRegister.userType = 'TODOS';
  }

  pesquisar() {
    this.userRegisterService.pesquisar()
      .then(usuariosRecuperados => {
        this.usuariosRecuperados = usuariosRecuperados;
        this.usersRegister.userType = 'TODOS';
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao pesquisar os usuários.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

  pesquisarPorEmail() {
    this.userRegisterService.pesquisarPorEmail(this.usersRegister)
      .then(usuariosRecuperados => {
        if (usuariosRecuperados.length > 0 && usuariosRecuperados[0].email != null) {
          this.usuariosRecuperados = usuariosRecuperados;
        } else {
          this.usuariosRecuperados = [];
        }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao pesquisar os usuários por e-mail.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }
}
