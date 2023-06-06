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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BannerComponent,
    NavbarComponent,
    SaleComponent,
    SearchComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminNavbarComponent,
    ProductDialog,
    UserDialog
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
