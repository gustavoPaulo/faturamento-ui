import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faturamento-pesquisa',
  standalone: false,
  templateUrl: './faturamento-pesquisa.component.html',
  styleUrl: './faturamento-pesquisa.component.css'
})
export class FaturamentoPesquisaComponent implements OnInit {

  constructor(
    private title: Title,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Consulta');
  }

  salvar() {

  }

  showSuccess() {
    this.toastr.success('Cadastro efetuado com sucesso!', 'Novo faturamento');
  }
}
