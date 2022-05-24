import { Component, OnInit } from '@angular/core';

import { FiltroFaturamento } from '../../core/model/filtroFaturamento';
import { FaturamentoService } from '../faturamento.service';

@Component({
  selector: 'app-faturamento-grid',
  templateUrl: './faturamento-grid.component.html',
  styleUrls: ['./faturamento-grid.component.css']
})
export class FaturamentoGridComponent implements OnInit {

  tipoFaturamento = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  filtroFaturamento = new FiltroFaturamento();
  faturamentos = [];
  cols = 5;

  constructor(
    private faturamentoService: FaturamentoService
  ) { }

  ngOnInit(): void {
  }

  pesquisar() {
    this.faturamentoService.pesquisar(this.filtroFaturamento)
      .then(resultado => {
        this.faturamentos = resultado;
      })
  }
}
