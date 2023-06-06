import { Injectable, Inject } from '@angular/core';
import { Category, SimpleList } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CategoryService extends ApiService<Category>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'categories';
    }

    public listWithProducts(): Observable<SimpleList<Category>> {

        return this.http.get<SimpleList<Category>>(`${this.uri}/with/products`);
      }
}