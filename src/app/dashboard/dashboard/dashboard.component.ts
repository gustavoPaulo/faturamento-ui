import { Component, OnInit } from '@angular/core';

import { Dashboard } from '../../core/model/dashboard';
import { Title } from '@angular/platform-browser';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboard = new Dashboard();

  constructor(
    private title: Title,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Billing - Dashboard');
    this.dashboard.mesAtual = new Date().toLocaleString('pt-BR', { month: 'long' });
  }

}
