import { Component } from '@angular/core';
import { Sale, SaleDetail, Payment } from 'shared/interfaces';
import { Confirm, ConfirmSale, Toast } from 'shared/alerts';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { SaleService } from 'src/app/services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends CartService {
  target_number: string = ""
  target_expiration: string = ""
  target_cvv: string = ""

  payment: Payment = {
    id: 0,
    id_sale: 0,
    sale_hour_date: '',
    amount: 0,
    street: '',
    status: ''
  }

  constructor(
    protected service: SaleService,
    protected authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super()

  }

  get createSaleData() {

    const details: SaleDetail[] = []

    this.getCartItems.forEach(item => {
      const detail: SaleDetail = {
        id: 0,
        id_sale: 0,
        id_product: item.id,
        total: Number(item.subtotal),
        amount: item.amount,
      }
      details.push(detail)
    })

    const date = new Date();
    const dateMexico = date.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formatDate = dateMexico.slice(6, 10) + '-' + dateMexico.slice(3, 5) + '-' + dateMexico.slice(0, 2)

    this.payment.sale_hour_date = formatDate


    const sale: Sale = {
      id: 0,
      id_user: this.authService.getDecodeToken()['id'],
      subtotal: this.getSubtotal,
      discount_rate: 50,
      total: this.getTotal,
      sale_date: formatDate,
      details: details,
      payment: this.payment
    }

    return sale;
  }

  get formComplete() {
    return this.payment.street.length > 20 && this.payment.street.length <= 255
      && this.target_number.length === 16
      && this.target_expiration.length === 5
      && this.target_expiration[2] === '/'
      && this.target_cvv.length === 3
  }

  confirmSale() {
    if (this.formComplete) {
      ConfirmSale.fire({
        title: '¿Esta seguro que desea realizar la compra y el pago?',
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
            });

            setTimeout(() => {
              this.router.navigate(['/home'], { relativeTo: this.route });
            }, 2000);

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
}
