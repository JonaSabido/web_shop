import { Injectable, Inject } from '@angular/core';
import { Category, Product, Sale, SimpleList } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SaleService extends ApiService<Sale>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'sales';
    }



}