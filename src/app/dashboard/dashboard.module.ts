import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

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

    LancamentosRoutingModule
  ]
})
export class DashboardModule { }
