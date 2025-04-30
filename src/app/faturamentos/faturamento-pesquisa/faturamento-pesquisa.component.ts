import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FaturamentoService } from '../faturamento.service';
import { FaturamentoFiltro } from '../../core/model/faturamento-filtro';
import { Faturamento } from '../../core/model/faturamento';

import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

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
  @Input() faturamentosRecuperados!: Faturamento[];

  constructor(
    private title: Title,
    private faturamentoService: FaturamentoService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Consulta');
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
}
