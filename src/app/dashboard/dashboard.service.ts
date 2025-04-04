import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environments.dev';

@Injectable()
export class DashboardService {

    dashboardUrl!: string;

    constructor(private http: HttpClient) {
        this.dashboardUrl = `${environment.faturamentoApiUrl}/dashboard`;
    }

}