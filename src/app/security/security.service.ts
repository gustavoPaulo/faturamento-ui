import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environments.dev';
import { UserRegister } from '../core/model/user-register';

@Injectable()
export class SecurityService {

    securityUrl!: string;

    constructor(private http: HttpClient) {
        this.securityUrl = `${environment.apiUrl}/user-register`;
    }

    login(user: UserRegister): Promise<any> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');

        return this.http.put<UserRegister>(`${this.securityUrl}/login`, user, { headers })
            .toPromise()
            .then(response => {
                const usuarioRecuperado = response as UserRegister;
                return usuarioRecuperado;
      });
    }

    /*novo(user: UserRegister): Promise<any> {
    }

    pesquisar(user: UserRegister): Promise<any> {

    }*/
}