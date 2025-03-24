import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegister } from '../../core/model/user-register';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user = new UserRegister;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private title: Title,
    public formBuilder: FormBuilder,
    private securityService: SecurityService
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
      .then(resultado => {
          if (null != resultado.user.code && resultado.user.code > 0) {
            this.router.navigate(['/faturamentos']);
          } else {
            this.router.navigate(['/login']);
          }
      })
      .catch(erro => 
        console.log('Falha ao efetuar login. Erro: ' + erro));
  }

}
