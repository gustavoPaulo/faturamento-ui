import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environments.dev';
import { Faturamento } from '../core/model/faturamento';
import { FaturamentoFiltro } from '../core/model/faturamento-filtro';

@Injectable()
export class FaturamentoService {

    faturamentoUrl!: string;

    constructor(private http: HttpClient) {
        this.faturamentoUrl = `${environment.faturamentoApiUrl}/invoices`;
    }

    pesquisar(filtro: FaturamentoFiltro): Promise<any> {
        let params = new HttpParams();

        if (filtro.description) {
            params = params.set('description', filtro.description);
        }

        if (filtro.priceMin) {
            params = params.set('priceMin', filtro.priceMin);
        }

        if (filtro.priceMax) {
            params = params.set('priceMax', filtro.priceMax);
        }

        if (filtro.type) {
            if (filtro.type == 'RECEITA') {
                params = params.set('type', 'RECIPE');
            } else if (filtro.type == 'DESPESA') {
                params = params.set('type', 'EXPENSE');
            }
        }

        if (filtro.dateStart) {
            params = params.set('dateStart', filtro.dateStart);
        }

        if (filtro.dateEnd) {
            params = params.set('dateEnd', filtro.dateEnd);
        }

        return this.http.get(`${this.faturamentoUrl}/findByFilter?filter`, { params })
            .toPromise()
            .then(response => {
                const faturamentosRecuperados = response as Faturamento[];
                return faturamentosRecuperados;
        });
    }

    excluir(codigo: number): Promise<void | null> {
        return this.http.delete(`${this.faturamentoUrl}/${codigo}`)
          .toPromise().then(() => null);
    }

    listar(): Promise<Faturamento[] | undefined> {
        return this.http.get<Faturamento[]>(this.faturamentoUrl).toPromise();
    }
}