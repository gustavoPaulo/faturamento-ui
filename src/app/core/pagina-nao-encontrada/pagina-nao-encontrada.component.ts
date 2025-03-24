import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: false,
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent implements OnInit {
  
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pagina não encontrada');
   }
}
