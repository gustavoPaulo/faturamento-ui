import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user = new UserRegister;
  loginForm!: FormGroup;
  rotaNovoUsuario = "/login/cadastro";

  constructor(
    private router: Router,
    private title: Title,
    public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Billing - Login');
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
    })
  }

  login() {
    this.user.email = this.loginForm.controls['email'].value;
    this.user.senha = this.loginForm.controls['senha'].value;
    
    this.securityService.login(this.user)
      .then(usuarioRecuperado => {
          if (null == usuarioRecuperado.code) {
            this.router.navigate(['/login']);
            this.loginForm.reset();
            this.showError('Nenhum usuário encontrado com o e-mail informado!', 'Falha ao efetuar login.');
          } else {
            if (usuarioRecuperado.code == 0) {
              this.router.navigate(['/login']);
              this.loginForm.reset();
              this.showError('E-mail ou senha incorretos!', 'Falha ao efetuar login.');
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao efetuar login.'));
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

}
