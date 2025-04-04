import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';

import { LoginComponent } from '../security/login/login.component';
import { SecurityRoutingModule } from '../security/security-routing.module';
import { UserCadastroComponent } from './user-cadastro/user-cadastro.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserPesquisaComponent } from './user-pesquisa/user-pesquisa.component';
import { UserNovoComponent } from './user-novo/user-novo.component';

@NgModule({
  declarations: [LoginComponent, UserCadastroComponent, UserGridComponent, UserPesquisaComponent, UserNovoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    DividerModule,
    TableModule,
    SelectButtonModule,
    TooltipModule,

    SecurityRoutingModule
  ],
  exports: []
})
export class SecurityModule { }
