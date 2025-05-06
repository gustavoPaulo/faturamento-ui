import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LancamentosRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,

    LancamentosRoutingModule
  ]
})
export class DashboardModule { }
