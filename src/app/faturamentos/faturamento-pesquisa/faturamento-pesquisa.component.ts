import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FaturamentoService } from '../faturamento.service';
import { FaturamentoFiltro } from '../../core/model/faturamento-filtro';
import { Faturamento } from '../../core/model/faturamento';

import { ToastrService } from 'ngx-toastr';

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
  @Input() faturamentosRecuperados!: Faturamento[];

  constructor(
    private title: Title,
    private faturamentoService: FaturamentoService,
    private toastr: ToastrService
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
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao pesquisar os faturamentos.'));
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  showInfo(message: string, titulo: string) {
    this.toastr.info(message, titulo);
  }
}
