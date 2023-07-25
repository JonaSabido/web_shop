import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SaleComponent } from './components/sale/sale.component';
import { RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminProductsComponent, ProductDialog } from './components/admin-products/admin-products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgMaterialModule } from '../../shared/angular-material/angular.material.module';
import { AdminUsersComponent, UserDialog } from './components/admin-users/admin-users.component';
import { SearchComponent } from './components/search/search.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminSalesComponent, SaleDialog } from './components/admin-sales/admin-sales.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent, CategoryDialog } from './components/admin-categories/admin-categories.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BannerComponent,
    NavbarComponent,
    SaleComponent,
    PaymentComponent,
    SearchComponent,
    AdminDashboardComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    AdminSalesComponent,
    AdminNavbarComponent,
    ProductDialog,
    CategoryDialog,
    UserDialog,
    SaleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    NgMaterialModule
  ],
  providers: [
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
