import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { FaturamentoPesquisaComponent } from './faturamento-pesquisa/faturamento-pesquisa.component';
import { LancamentosRoutingModule } from './faturamentos-routing.module';
import { FaturamentoGridComponent } from './faturamento-grid/faturamento-grid.component';


@NgModule({
  declarations: [
    FaturamentoPesquisaComponent,
    FaturamentoGridComponent
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    
    LancamentosRoutingModule
  ]
})
export class FaturamentosModule { }
