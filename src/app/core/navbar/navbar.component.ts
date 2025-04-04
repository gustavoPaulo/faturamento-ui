import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: '/dashboard'
        },
        {
            label: 'Faturamentos',
            icon: 'pi pi-money-bill',
            items: [
                {
                    label: 'Novo faturamento',
                    icon: 'pi pi-file-plus',
                    routerLink: '/faturamentos/novo'
                },
                {
                    label: 'Pesquisar faturamento',
                    icon: 'pi pi-search',
                    routerLink: '/faturamentos'
                }]
        },
        {
          label: 'Usuários',
          icon: 'pi pi-user',
          items: [
              {
                  label: 'Novo usuário',
                  icon: 'pi pi-user-plus',
                  routerLink: '/users/novo'
              },
              {
                  label: 'Pesquisar usuário',
                  icon: 'pi pi-search',
                  routerLink: '/users'
              }]
        }
      ];
    }
}
