import { Injectable, Inject } from '@angular/core';
import { Category, Product, SimpleList } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductService extends ApiService<Product>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'products';
    }

    public search(shortName: string): Observable<SimpleList<Product>> {
        return this.http.get<SimpleList<Product>>(`${this.uri}/search/${shortName}`);
    }

}