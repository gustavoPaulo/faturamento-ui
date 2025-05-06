import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from '../app/core/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from '../app/core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FaturamentoPesquisaComponent } from './faturamentos/faturamento-pesquisa/faturamento-pesquisa.component';
import { UserCadastroComponent } from './security/user-cadastro/user-cadastro.component';
import { LoginComponent } from './security/login/login.component';
import { FaturamentoCadastroComponent } from './faturamentos/faturamento-cadastro/faturamento-cadastro.component';
import { UserPesquisaComponent } from './security/user-pesquisa/user-pesquisa.component';
import { UserNovoComponent } from './security/user-novo/user-novo.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '', children: [
      { path: 'faturamentos', component: FaturamentoPesquisaComponent },
      { path: 'faturamentos/novo', component: FaturamentoCadastroComponent },
      { path: 'faturamentos/:code', component: FaturamentoCadastroComponent },
      { path: 'users', component: UserPesquisaComponent },
      { path: 'users/novo', component: UserNovoComponent },
      { path: 'users/:code', component: UserNovoComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login/cadastro', component: UserCadastroComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dash-faturamentos/:fattype', component: FaturamentoPesquisaComponent}
    ]
  },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
