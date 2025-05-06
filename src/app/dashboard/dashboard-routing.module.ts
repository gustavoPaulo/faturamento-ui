import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FaturamentoPesquisaComponent } from '../faturamentos/faturamento-pesquisa/faturamento-pesquisa.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dash-faturamentos/:fattype', component: FaturamentoPesquisaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }