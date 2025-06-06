import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FaturamentoService } from '../faturamento.service';
import { Faturamento } from '../../core/model/faturamento';
import { ErrorMessage } from '../../core/model/error-message';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-faturamento-cadastro',
  standalone: false,
  templateUrl: './faturamento-cadastro.component.html',
  styleUrl: './faturamento-cadastro.component.css'
})
export class FaturamentoCadastroComponent implements OnInit {

  faturamento = new Faturamento();
  errorMessage = new ErrorMessage();
  options: any[] = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  constructor(
    private title: Title,
    private faturamentoService: FaturamentoService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
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
          this.faturamento.type = 'RECEITA';
        }
      })
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao salvar o faturamento.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
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
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao atualizar o faturamento.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
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
      .catch(erro => {
        this.errorMessage.messageInfo = 'Falha ao carregar o faturamento.';
        this.errorMessage.level = 'ERROR';
        this.errorHandler.handle(erro, this.errorMessage);
      });
  }

  showSuccess(message: string, titulo: string) {
    this.toastr.success(message, titulo);
  }

  get editando() {
    return Boolean(this.faturamento.code);
  }
}
