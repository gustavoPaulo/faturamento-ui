import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FaturamentoService } from '../faturamento.service';
import { Faturamento } from '../../core/model/faturamento';

@Component({
  selector: 'app-faturamento-cadastro',
  standalone: false,
  templateUrl: './faturamento-cadastro.component.html',
  styleUrl: './faturamento-cadastro.component.css'
})
export class FaturamentoCadastroComponent implements OnInit {

  faturamento = new Faturamento();
  options: any[] = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  constructor(
    private title: Title,
    private faturamentoService: FaturamentoService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const codigoFaturamento = this.actRoute.snapshot.params[`code`];

    if (codigoFaturamento) {
      this.carregarFaturamento(codigoFaturamento);
    }
    
    var tituloAtual = codigoFaturamento > 0 ? 'Editar faturamento' : 'Novo faturamento';
    this.title.setTitle('Billing - ' + tituloAtual);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarFaturamento(form);
    } else {
      this.adicionarFaturamento(form);
    }
  }

  adicionarFaturamento(form: NgForm) {
    this.faturamentoService.salvar(this.faturamento)
      .then(faturamentoSalvo => {
        if (faturamentoSalvo.code > 0) {
          this.showSuccess('Faturamento salvo com sucesso!', 'Ação efetuada');
          form.reset();
        }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao salvar o faturamento.'));
  }

  atualizarFaturamento(form: NgForm) {
    this.faturamentoService.atualizar(this.faturamento)
      .then(faturamentoAtualizado => {
        if (faturamentoAtualizado.code > 0) {
          this.showSuccess('Faturamento atualizado com sucesso!', 'Ação efetuada');
          form.reset();
          this.router.navigate(['/faturamentos']);
        }
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao atualizar o faturamento.'));
  }

  carregarFaturamento(codigo: number) {
    this.faturamentoService.buscarPorCodigo(codigo)
      .then(faturamento => {
        if (faturamento.type === 'RECIPE') {
          faturamento.type = 'RECEITA';
        }
        if (faturamento.type === 'EXPENSE') {
          faturamento.type = 'DESPESA';
        }
        this.faturamento = faturamento;
      })
      .catch(erro => this.showError('Erro interno: ' + erro,'Falha ao carregar o faturamento.'));
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }

  showError(message: string, titulo: string) {
    this.toastr.error(message, titulo);
  }

  get editando() {
    return Boolean(this.faturamento.code);
  }
}
