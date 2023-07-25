import { Injectable, Inject } from '@angular/core';
import { BalanceSale, BalanceTotal, Category, MoreProductSale, Product, SaleWeek, SimpleList, User } from 'shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService extends ApiService<Product>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'data';
    }

    public getBalanceTotals(): Observable<BalanceTotal> {
        return this.http.get<BalanceTotal>(`${this.uri}/balance/`, this.options);
    }

    public getBalanceSales(): Observable<BalanceSale> {
        return this.http.get<BalanceSale>(`${this.uri}/balance/sale`, this.options);
    }

    public getSalesWeeks(): Observable<SaleWeek[]> {
        return this.http.get<SaleWeek[]>(`${this.uri}/sales/week`, this.options);
    }

    public getProductsMoreSales(): Observable<MoreProductSale[]> {
        return this.http.get<MoreProductSale[]>(`${this.uri}/products/moresales`, this.options);
    }

    public getLatestUsers(): Observable<SimpleList<User>> {
        return this.http.get<SimpleList<User>>(`${this.uri}/latestusers`, this.options);
    }


}