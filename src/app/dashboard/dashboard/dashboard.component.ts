import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Dashboard } from '../../core/model/dashboard';
import { DashboardService } from '../dashboard.service';

import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboard = new Dashboard();

  constructor(
    private title: Title,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Dashboard');
    this.gerarDadosMesAtual();
  }

  gerarDadosMesAtual() {
    this.toastr.info('Gerando dados do mês atual...');
    
    this.dashboard.maiorDespesa = '1.00';
    this.dashboard.menorDespesa = '2.00';
    this.dashboard.maiorReceita = '3.00';
    this.dashboard.menorReceita = '4.00';
    this.dashboard.mesAtual = new Date().toLocaleString('pt-BR', {month: 'long', year: 'numeric'});
  }

}
