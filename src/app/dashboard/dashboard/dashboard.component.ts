import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Dashboard } from '../../core/model/dashboard';
import { DashboardService } from '../dashboard.service';
import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboard = new Dashboard();
  errorMessage = new ErrorMessage();
  fatTypeExpense = 'despesas';
  fatTypeRecipe = 'receitas';

  constructor(
    private title: Title,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Dashboard');
    this.gerarDadosMesAtual();
  }

  gerarDadosMesAtual() {
    var mesAtual = new Date().toLocaleString('pt-BR', {month: 'numeric', year: 'numeric'})
    .replace('/', '-');

    this.dashboardService.fieldDash(mesAtual)
      .then(dashboardRecovered => {
        this.dashboard.maiorDespesa = dashboardRecovered.maiorDespesa;
        this.dashboard.menorDespesa = dashboardRecovered.menorDespesa;
        this.dashboard.maiorReceita = dashboardRecovered.maiorReceita;
        this.dashboard.menorReceita = dashboardRecovered.menorReceita;
        this.dashboard.mesAtual = new Date().toLocaleString('pt-BR', {month: 'long', year: 'numeric'});
    })
    .catch(erro => {
      this.errorMessage.messageInfo = 'Falha ao gerar dados do Dashboard.';
      this.errorMessage.level = 'ERROR';
      this.errorHandler.handle(erro, this.errorMessage);
    });
  }

  regerarDados() {
    this.toastr.info('Gerando dados do mês atual...', 'Dashboard');
    this.gerarDadosMesAtual();
  }

}
