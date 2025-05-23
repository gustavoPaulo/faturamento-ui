import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SecurityService } from '../security/security.service';
import { FaturamentoService } from '../faturamentos/faturamento.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ErrorHandlerService } from './error-handler.service';


@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,

    MenubarModule,
    BadgeModule
  ],
  exports: [NavbarComponent],
  providers: [
    SecurityService,
    FaturamentoService,
    DashboardService,
    ErrorHandlerService
  ]
})
export class CoreModule { }
