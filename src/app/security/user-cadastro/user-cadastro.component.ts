import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-cadastro',
  standalone: false,
  templateUrl: './user-cadastro.component.html',
  styleUrl: './user-cadastro.component.css'
})
export class UserCadastroComponent implements OnInit {

  user = new UserRegister;
  cadastroForm!: FormGroup;
  rotaLogin = "/login";
  errorMessage = new ErrorMessage();

  constructor(
    private router: Router,
    private title: Title,
    public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Billing - Novo usuário');
    this.cadastroForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
        confirmSenha: ['', [Validators.required]]
    })
  }

  cadastrar() {
    this.user.email = this.cadastroForm.controls['email'].value;
    this.user.senha = this.cadastroForm.controls['senha'].value;
    
    if (this.user.senha == this.cadastroForm.controls['confirmSenha'].value) {
      this.securityService.novo(this.user)
      .then(novoUsuario => {
          if (null != novoUsuario.code) {
            this.router.navigate(['/login']);
            this.showSuccess('Cadastro efetuado com sucesso!','Novo usuário.');
          } else {
            this.router.navigate(['/login/cadastro']);
            this.cadastroForm.reset();

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

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }
}
