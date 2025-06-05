import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ErrorMessage } from '../../core/model/error-message';


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
  errorMessage = new ErrorMessage();

  constructor(
    private router: Router,
    private title: Title,
    public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private errorHandler: ErrorHandlerService
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

            this.errorMessage.title = 'Falha ao efetuar login.';
            this.errorMessage.messageInfo = 'Nenhum usuário encontrado com o e-mail informado!';
            this.errorMessage.level = 'ERROR';
            this.errorHandler.handle(null, this.errorMessage);
          } else {
            if (usuarioRecuperado.code == 0) {
              this.router.navigate(['/login']);
              this.loginForm.reset();

              this.errorMessage.title = 'Falha ao efetuar login.';
              this.errorMessage.messageInfo = 'E-mail ou senha incorretos!';
              this.errorMessage.level = 'ERROR';
              this.errorHandler.handle(null, this.errorMessage);
            } else {
              localStorage.setItem('userEmail', this.user.email);
              this.router.navigate(['/dashboard']);
            }
          }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao efetuar login.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

}
