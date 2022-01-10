import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    FormsModule,
    InputTextModule,
    RouterModule,
    SelectButtonModule,
    InputTextareaModule,

    FaturamentosRoutingModule
  ],
  exports: [
    FaturamentoCadastroComponent,
    FaturamentoGridComponent
  ]
})
export class FaturamentoModule { }