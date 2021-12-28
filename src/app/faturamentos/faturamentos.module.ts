import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

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
    TableModule,

    FaturamentosRoutingModule
  ],
  exports: [
    FaturamentoCadastroComponent,
    FaturamentoGridComponent
  ]
})
export class FaturamentoModule { }