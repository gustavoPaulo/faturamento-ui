import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-cadastro',
  standalone: false,
  templateUrl: './user-cadastro.component.html',
  styleUrl: './user-cadastro.component.css'
})
export class UserCadastroComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Novo usuário');
  }
}
