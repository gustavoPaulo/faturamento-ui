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

    pesquisarPorEmail(filter: UserRegister): Promise<any> {
        let params = new HttpParams();

        if (filter.email) {
            params = params.set('email', filter.email);
        }

        if (filter.userType && filter.userType != 'TODOS') {
            params = params.set('userType', filter.userType);
        }

        return this.http.get(`${this.securityUrl}/findByEmailAndType?filter`, { params })
            .toPromise()
            .then(response => {
                const usuariosRecuperados = response as UserRegister[];
                return usuariosRecuperados;
        });
    }

    excluir(codigo: number): Promise<void | null> {
        return this.http.delete(`${this.securityUrl}/${codigo}`)
          .toPromise().then(() => null);
    }

    atualizar(user: UserRegister): Promise<any> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        
        return this.http.put<UserRegister>(`${this.securityUrl}`, user, { headers })
            .toPromise()
            .then(response => {
                const usuarioAtualizado = response as UserRegister;
                return usuarioAtualizado;
        });
    }

    buscarPorCodigo(codigo: number): Promise<UserRegister> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        
        return this.http.get(`${this.securityUrl}/${codigo}`, { headers })
            .toPromise()
            .then(response => {
                const usuario = response as UserRegister;
                return usuario;
            });
    }
}