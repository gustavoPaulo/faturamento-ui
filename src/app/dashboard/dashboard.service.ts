import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environments.dev';
import { Dashboard } from '../core/model/dashboard';

@Injectable()
export class DashboardService {

    dashboardUrl!: string;

    constructor(private http: HttpClient) {
        this.dashboardUrl = `${environment.faturamentoApiUrl}/dashboard`;
    }

    fieldDash(mesAtual: string): Promise<Dashboard> {
        let params = new HttpParams();

        if (mesAtual) {
            params = params.set('currentMonth', mesAtual);
        }
            
        return this.http.get(`${this.dashboardUrl}`, { params })
            .toPromise()
            .then(response => {
                const dashboardRecovered = response as Dashboard;
                return dashboardRecovered;
        });
    }
}