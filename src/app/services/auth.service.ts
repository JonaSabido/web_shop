import { Injectable, Inject } from '@angular/core';
import { User, LoginSuccess, Login, Register } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends ApiService<User>{
    helper = new JwtHelperService()
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'auth';
    }


    public login(data: Login): Observable<LoginSuccess> {
        return this.http.post<LoginSuccess>(`${this.uri}/login`, data);
    }

    public register(data: Register): Observable<User> {
        return this.http.post<User>(`${this.uri}/register`, data);
    }

    public logOut() {
        localStorage.removeItem("cartItems")
        localStorage.removeItem("token_shop_app")
        location.href = '/'

    }

    public isTokenValid(){
        try{
            const token = localStorage.getItem("token_shop_app")
            return !this.helper.isTokenExpired(token)
        }
        catch{
            return false
        }
    }

    public isTokenValidForAdmin(){
        try{
            const token = localStorage.getItem("token_shop_app") || ""
            return !this.helper.isTokenExpired(token) && this.helper.decodeToken(token)['user']['id_profile'] == 1
        }
        catch{
            return false
        }
    }

    public getDecodeToken(){
        try{
            const token = localStorage.getItem("token_shop_app") || ""
            console.log(this.helper.decodeToken(token)['user'])
            return this.helper.decodeToken(token)['user']
        }
        catch{
            return false
        }
    }
}