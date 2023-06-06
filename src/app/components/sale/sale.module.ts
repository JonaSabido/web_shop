import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { CartService } from 'src/app/services/cart.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    
  ]
})
export class SaleModule { }
