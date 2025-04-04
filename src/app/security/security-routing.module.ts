import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../security/login/login.component';
import { UserCadastroComponent } from './user-cadastro/user-cadastro.component';
import { UserPesquisaComponent } from './user-pesquisa/user-pesquisa.component';
import { UserNovoComponent } from './user-novo/user-novo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/cadastro', component: UserCadastroComponent },
  { path: 'users', component: UserPesquisaComponent },
  { path: 'users/novo', component: UserNovoComponent },
  { path: 'users/:code', component: UserNovoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }