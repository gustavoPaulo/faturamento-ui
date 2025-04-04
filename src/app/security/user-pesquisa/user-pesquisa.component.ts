import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() usuariosRecuperados!: UserRegister[];

  constructor(
    private title: Title,
    private userRegisterService: SecurityService,
    private toastr: ToastrService
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
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao pesquisar os usuários.'));
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
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao pesquisar os usuários por e-mail.'));
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  showInfo(message: string, titulo: string) {
    this.toastr.info(message, titulo);
  }
}
