import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoAutorizadoComponent } from '../app/core/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from '../app/core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FaturamentoPesquisaComponent } from './faturamentos/faturamento-pesquisa/faturamento-pesquisa.component';
import { UserCadastroComponent } from './security/user-cadastro/user-cadastro.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '', children: [
      { path: 'faturamentos', component: FaturamentoPesquisaComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login/cadastro', component: UserCadastroComponent }
    ]
  },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
