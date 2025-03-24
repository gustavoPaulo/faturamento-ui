import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../security/login/login.component';
import { UserCadastroComponent } from './user-cadastro/user-cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/cadastro', component: UserCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }