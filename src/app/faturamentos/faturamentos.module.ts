import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';

import { FaturamentoPesquisaComponent } from './faturamento-pesquisa/faturamento-pesquisa.component';
import { LancamentosRoutingModule } from './faturamentos-routing.module';
import { FaturamentoGridComponent } from './faturamento-grid/faturamento-grid.component';
import { FaturamentoCadastroComponent } from './faturamento-cadastro/faturamento-cadastro.component';


@NgModule({
  declarations: [
    FaturamentoPesquisaComponent,
    FaturamentoGridComponent,
    FaturamentoCadastroComponent
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FluidModule,
    TableModule,
    DividerModule,
    CheckboxModule,
    
    LancamentosRoutingModule
  ]
})
export class FaturamentosModule { }
