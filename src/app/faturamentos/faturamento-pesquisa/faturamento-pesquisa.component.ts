import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationService } from 'primeng/api';

import { FaturamentoService } from '../faturamento.service';
import { FaturamentoFiltro } from '../../core/model/faturamento-filtro';
import { Faturamento } from '../../core/model/faturamento';

import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FaturamentoGridComponent } from '../faturamento-grid/faturamento-grid.component';

@Component({
  selector: 'app-faturamento-pesquisa',
  standalone: false,
  templateUrl: './faturamento-pesquisa.component.html',
  styleUrl: './faturamento-pesquisa.component.css'
})
export class FaturamentoPesquisaComponent implements OnInit {

  options: any[] = [
    {label: 'Todos', value: 'TODOS'},
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];
  filtro = new FaturamentoFiltro;
  errorMessage = new ErrorMessage();
  faturamentosRecuperados!: Faturamento[];
  @ViewChild(FaturamentoGridComponent) faturamentosParaEnvioPorEmail: any;
  userMail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : 'usuário logado';

  constructor(
    private title: Title,
    private toastr: ToastrService,
    private faturamentoService: FaturamentoService,
    private errorHandler: ErrorHandlerService,
    private actRoute: ActivatedRoute,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Consulta');

    const fatType = this.actRoute.snapshot.params[`fattype`];

    if (fatType === 'receitas') {
      this.filtro.type = 'RECEITA';
    } else if (fatType === 'despesas') {
      this.filtro.type = 'DESPESA';
    }

    this.pesquisar();
  }

  pesquisar() {
    this.faturamentoService.pesquisar(this.filtro)
      .then(faturamentosRecuperados => {
        this.faturamentosRecuperados = faturamentosRecuperados;
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao pesquisar os faturamentos.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

  confirmarEnvioPorEmail() {

    if (undefined === this.faturamentosParaEnvioPorEmail.faturamentosParaEnvioPorEmail) {

        this.errorMessage.title = 'Falho ao enviar';
        this.errorMessage.messageInfo = 'É necessário selecionar pelo menos um faturamento.';
        this.errorMessage.level = 'INFO';
        this.errorHandler.handle(null, this.errorMessage);

    } else {

      const qtdFaturamentos = this.faturamentosParaEnvioPorEmail.faturamentosParaEnvioPorEmail.length;

      this.confirmation.confirm({
      message: 'Deseja confirmar o envio por e-mail de ' + qtdFaturamentos + ' faturamentos para [' + this.userMail + '] ?',
        accept: () => {
          this.enviarPorEmail(this.faturamentosParaEnvioPorEmail.faturamentosParaEnvioPorEmail);
        }
      });
    }

  }

  enviarPorEmail(faturamentos: Faturamento[]) {

    this.faturamentoService.enviarPorEmail(faturamentos, this.userMail!)
      .then((response) => {
        if (response.status === 'OK') {
          this.showSuccess(response.message, 'Ação efetuada');
          window.location.reload();
        } else {
          this.errorMessage.title = 'Falha ao enviar faturamento por e-mail.';
          this.errorMessage.messageInfo = response.message;
          this.errorMessage.level = 'ERROR';
          this.errorHandler.handle(response.message, this.errorMessage);
        }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao enviar faturamento por e-mail.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }
}
