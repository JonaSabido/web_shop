import { Injectable, Inject } from '@angular/core';
import { Category, Product, User } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService extends ApiService<User>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'users';
    }

}