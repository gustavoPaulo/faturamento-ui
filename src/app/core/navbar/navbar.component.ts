import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Faturamento',
        icon: 'pi pi-money-bill',
        items: [{
                  label: 'Novo faturamento', 
                  icon: 'pi pi-plus',
                  routerLink: 'novoFaturamento'
                },
                { 
                  label: 'Pesquisar',
                  icon: 'pi pi-search',
                  routerLink: 'pesquisaFaturamentos'
                }]
          
      },
      {
        label: 'Configuração',
        icon: 'pi pi-cog',
        items: [{
                  label: 'Usuário', 
                  icon: 'pi pi-user',
                  items: [{
                            label: 'Novo usuário',
                            icon: 'pi pi-user-plus'
                          },
                          {
                            label: 'Pesquisar',
                            icon: 'pi pi-search'
                          }]
                }]
          
      },
      {
        label: 'Sair',
        icon: 'pi pi-power-off'
      }];
  }
}
