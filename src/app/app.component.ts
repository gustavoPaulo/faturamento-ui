import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  rotasPermitidas = ['/faturamentos', '/faturamentos/novo'];

  constructor(
    private router: Router
  ) { }


  exibirNavbar() {
    var urlAtual = this.router.url;
    var podeMostrar = this.rotasPermitidas.find((rota) => rota == urlAtual);

    return podeMostrar;
  }
}
