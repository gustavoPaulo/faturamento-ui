import { Component, OnInit } from '@angular/core';

import { Faturamento } from 'src/app/core/model/faturamento';

@Component({
  selector: 'app-faturamento-cadastro',
  templateUrl: './faturamento-cadastro.component.html',
  styleUrls: ['./faturamento-cadastro.component.css']
})
export class FaturamentoCadastroComponent implements OnInit {

  tipoFaturamento = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  faturamento = new Faturamento();

  constructor() { }

  ngOnInit(): void {
  }

  get editando() {
    return Boolean(this.faturamento.codigo);
  }

  salvar(form: any) {
    console.log(form.value);
  }

}
