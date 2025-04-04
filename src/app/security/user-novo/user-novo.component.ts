import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { UserPasswordConfirmation } from '../../core/model/user-password-confirmation';

@Component({
  selector: 'app-user-novo',
  standalone: false,
  templateUrl: './user-novo.component.html',
  styleUrl: './user-novo.component.css'
})
export class UserNovoComponent implements OnInit {

  user = new UserRegister();
  userPasswordConfirmation = new UserPasswordConfirmation();
  options: any[] = [
    {label: 'Padrão', value: 'DEFAULT'},
    {label: 'Administrador', value: 'ADMIN'}
  ];

  constructor(
    private title: Title,
    private userRegisterService: SecurityService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute
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
            this.showError('Já existe um usuário cadastrado com o e-mail informado!', 'Novo usuário.');
          }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao cadastrar novo usuário.'));

    } else {
      this.showError('A senha de confirmação deve ser igual a Senha!', 'Novo usuário.');
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
            this.showError('Já existe um usuário cadastrado com o e-mail informado!', 'Atualização de usuário.');
          }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao atualizar usuário.'));

    } else {
      this.showError('A senha de confirmação deve ser igual a Senha!', 'Atualização de usuário.');
    }
  }

  carregarUsuario(codigo: number) {
    this.userRegisterService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.user = usuario;
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao carregar o usuário.'));
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  showInfo(message: string, titulo: string) {
    this.toastr.info(message, titulo);
  }

  get editando() {
    return Boolean(this.user.code);
  }
}
