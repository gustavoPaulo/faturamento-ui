import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaturamentoPesquisaComponent } from './faturamento-pesquisa/faturamento-pesquisa.component';

const routes: Routes = [
  { path: 'faturamentos', component: FaturamentoPesquisaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }