import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { FaturamentoCadastroComponent } from './faturamento-cadastro/faturamento-cadastro.component';
import { FaturamentoGridComponent } from './faturamento-grid/faturamento-grid.component';
import { FaturamentosRoutingModule } from './faturamentos-routing.module';

@NgModule({
  declarations: [
    FaturamentoCadastroComponent,
    FaturamentoGridComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,

    FaturamentosRoutingModule
  ],
  exports: [
    FaturamentoCadastroComponent,
    FaturamentoGridComponent
  ]
})
export class FaturamentoModule { }