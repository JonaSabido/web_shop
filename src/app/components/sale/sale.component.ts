import { Component, OnInit } from '@angular/core';
import { Confirm, ConfirmSale, Toast } from 'shared/alerts';
import { Product, Sale, SaleDetail } from 'shared/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent extends CartService implements OnInit {
  constructor(
    protected service: SaleService,
    protected cartService: CartService,
    protected authService: AuthService
  ) {
    super()
  }

  ngOnInit(): void {
    this.cartService.getCartItems

  }



}
