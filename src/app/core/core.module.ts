import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';

import { MenubarModule } from 'primeng/menubar';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { FaturamentoService } from '../faturamentos/faturamento.service';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    DashboardService,
    FaturamentoService
  ]
})
export class CoreModule { }
