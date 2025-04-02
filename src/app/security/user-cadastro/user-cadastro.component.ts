import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';
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
  ingredient!: string;

  constructor(
    private router: Router,
    private title: Title,
    public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private toastr: ToastrService
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
            this.showError('Já existe um usuário cadastrado com o e-mail informado!', 'Novo usuário.');
          }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao cadastrar novo usuário.'));

    } else {
      this.showError('A senha de confirmação deve ser igual a Senha!', 'Novo usuário.');
    }
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }
}
