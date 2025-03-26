import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environments.dev';
import { UserRegister } from '../core/model/user-register';

@Injectable()
export class SecurityService {

    securityUrl!: string;

    constructor(private http: HttpClient) {
        this.securityUrl = `${environment.userApiUrl}/user-register`;
    }

    login(user: UserRegister): Promise<any> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');

        return this.http.post<UserRegister>(`${this.securityUrl}/login`, user, { headers })
            .toPromise()
            .then(response => {
                const usuarioRecuperado = response as UserRegister;
                return usuarioRecuperado;
      });
    }

    novo(user: UserRegister): Promise<any> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');

        return this.http.post<UserRegister>(`${this.securityUrl}/novo`, user, { headers })
            .toPromise()
            .then(response => {
                const usuarioRecuperado = response as UserRegister;
                return usuarioRecuperado;
      });
    }

    pesquisar(): Promise<any> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');

        return this.http.get(`${this.securityUrl}`, { headers })
            .toPromise()
            .then(response => {
                const usuarioRecuperado = response as UserRegister[];
                return usuarioRecuperado;
        });
    }
}