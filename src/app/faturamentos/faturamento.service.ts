import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { FiltroFaturamento } from "../core/model/filtroFaturamento";

@Injectable()
export class FaturamentoService {

    faturamentosUrl: string;

    constructor(private http: HttpClient) {
        this.faturamentosUrl = `${environment.apiUrl}/faturamentos`;
    }

    pesquisar(filtro: FiltroFaturamento): Promise<any> {
        let params = new HttpParams();
    
        if (filtro.tipo) {
          params = params.set('tipo', filtro.tipo);
        }
    
        if (filtro.dataInicio) {
          params = params.set('dataInicio',
            moment(filtro.dataInicio).format('YYYY-MM-DD'));
        }
    
        if (filtro.dataFim) {
          params = params.set('dataFim',
            moment(filtro.dataFim).format('YYYY-MM-DD'));
        }
    
        return this.http.get(`${this.faturamentosUrl}?resumo`,
          { params })
          .toPromise()
          .then(response => {
            const faturamentos = response;
            const resultado = { faturamentos };
    
            return resultado;
          });
      }
}