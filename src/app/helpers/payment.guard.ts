import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

    constructor(private cartService: CartService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.cartService.getCartItems

        if (this.cartService.getCartItems.length >= 1) {
            return true;
        } else {
            this.router.navigate(['/home']);
            return false;
        }
    }
}