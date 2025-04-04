import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaturamentoPesquisaComponent } from './faturamento-pesquisa/faturamento-pesquisa.component';
import { FaturamentoCadastroComponent } from './faturamento-cadastro/faturamento-cadastro.component';

const routes: Routes = [
  { path: 'faturamentos', component: FaturamentoPesquisaComponent },
  { path: 'faturamentos/novo', component: FaturamentoCadastroComponent },
  { path: 'faturamentos/:code', component: FaturamentoCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }