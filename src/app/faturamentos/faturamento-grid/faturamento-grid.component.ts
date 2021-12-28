import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faturamento-grid',
  templateUrl: './faturamento-grid.component.html',
  styleUrls: ['./faturamento-grid.component.css']
})
export class FaturamentoGridComponent implements OnInit {

  faturamentos = [];

  constructor() { }

  ngOnInit(): void {
  }

}
