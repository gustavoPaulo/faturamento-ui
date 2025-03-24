import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faturamento-pesquisa',
  standalone: false,
  templateUrl: './faturamento-pesquisa.component.html',
  styleUrl: './faturamento-pesquisa.component.css'
})
export class FaturamentoPesquisaComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Consulta');
   }
}
