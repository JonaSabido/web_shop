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

  }

  get createSaleData() {

    const details: SaleDetail[] = []

    this.getCartItems.forEach(item => {
      const detail: SaleDetail = {
        id: 0,
        id_sale: 0,
        id_product: item.id,
        total: item.subtotal,
        amount: item.amount,
      }
      details.push(detail)
    })

    const sale: Sale = {
      id: 0,
      id_user: this.authService.getDecodeToken()['id'],
      total: this.getTotal,
      sale_date: new Date().toISOString().slice(0, 10),
      details: details
    }
    return sale;
  }

  confirmSale() {
    ConfirmSale.fire({
      title: '¿Esta seguro que desea realizar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.service.store(this.createSaleData).subscribe(response => {
          this.cleanCart()
          Toast.fire({
            icon: 'success',
            title: 'Compra realizada correctamente',
          })
        },
          error => {
            Toast.fire({
              icon: 'error',
              title: 'Error al realizar la compra'
            });
          })
      }
    },
    )
  }
}
