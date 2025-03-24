import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from '../security/login/login.component';
import { SecurityRoutingModule } from '../security/security-routing.module';
import { UserCadastroComponent } from './user-cadastro/user-cadastro.component';

@NgModule({
  declarations: [LoginComponent, UserCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,

    SecurityRoutingModule
  ],
  exports: []
})
export class SecurityModule { }
