import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { UserPasswordConfirmation } from '../../core/model/user-password-confirmation';
import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-user-novo',
  standalone: false,
  templateUrl: './user-novo.component.html',
  styleUrl: './user-novo.component.css'
})
export class UserNovoComponent implements OnInit {

  user = new UserRegister();
  userPasswordConfirmation = new UserPasswordConfirmation();
  errorMessage = new ErrorMessage();
  options: any[] = [
    {label: 'Padrão', value: 'DEFAULT'},
    {label: 'Administrador', value: 'ADMIN'}
  ];

  constructor(
    private title: Title,
    private userRegisterService: SecurityService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const codigoUsuario = this.actRoute.snapshot.params[`code`];

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }
    
    var tituloAtual = codigoUsuario > 0 ? 'Editar usuário' : 'Novo usuário';
    this.title.setTitle('Billing - ' + tituloAtual);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: NgForm) {
    if (this.user.senha === this.userPasswordConfirmation.confirmarSenha) {
      this.userRegisterService.novo(this.user)
      .then(novoUsuario => {
          if (null != novoUsuario.code) {
            form.reset();
            this.showSuccess('Usuário cadastrado com sucesso!','Novo usuário.');
          } else {
            this.router.navigate(['/users/novo']);

            this.errorMessage.title = 'Novo usuário.';
            this.errorMessage.messageInfo = 'Já existe um usuário cadastrado com o e-mail informado!';
            this.errorMessage.level = 'ERROR';
            this.errorHandler.handle(null, this.errorMessage);
          }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao cadastrar novo usuário.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });

    } else {
      this.errorMessage.title = 'Novo usuário.';
      this.errorMessage.messageInfo = 'A senha de confirmação deve ser igual a Senha!';
      this.errorMessage.level = 'ERROR';
      this.errorHandler.handle(null, this.errorMessage);
    }
  }

  atualizarUsuario(form: NgForm) {
    if (this.user.senha === this.userPasswordConfirmation.confirmarSenha) {
      this.userRegisterService.atualizar(this.user)
      .then(novoUsuario => {
          if (null != novoUsuario.code) {
            this.router.navigate(['/users']);
            this.showSuccess('Usuário atualizado com sucesso!','Atualização de usuário.');
          } else {
            this.errorMessage.title = 'Atualização de usuário.';
            this.errorMessage.messageInfo = 'Já existe um usuário cadastrado com o e-mail informado!';
            this.errorMessage.level = 'ERROR';
            this.errorHandler.handle(null, this.errorMessage);
          }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao atualizar o usuário.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });

    } else {
      this.errorMessage.title = 'Atualização de usuário.';
      this.errorMessage.messageInfo = 'A senha de confirmação deve ser igual a Senha!';
      this.errorMessage.level = 'ERROR';
      this.errorHandler.handle(null, this.errorMessage);
    }
  }

  carregarUsuario(codigo: number) {
    this.userRegisterService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.user = usuario;
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao carregar o usuário.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }

  get editando() {
    return Boolean(this.user.code);
  }
}
