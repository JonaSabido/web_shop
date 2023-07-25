import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaleComponent } from './components/sale/sale.component';
import { AuthGuard } from './helpers/auth.guard';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminGuard } from './helpers/admin.guard';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { SearchComponent } from './components/search/search.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminSalesComponent } from './components/admin-sales/admin-sales.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PaymentGuard } from './helpers/payment.guard';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'sale',
    canActivate: [AuthGuard],
    component: SaleComponent
  },
  {
    path: 'payment',
    canActivate: [AuthGuard, PaymentGuard],
    component: PaymentComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent
  },
  {
    path: 'panel/dashboard',
    canActivate: [AdminGuard],
    component: AdminDashboardComponent
  },
  {
    path: 'panel/products',
    canActivate: [AdminGuard],
    component: AdminProductsComponent
  },
  {
    path: 'panel/categories',
    canActivate: [AdminGuard],
    component: AdminCategoriesComponent
  },
  {
    path: 'panel/users',
    canActivate: [AdminGuard],
    component: AdminUsersComponent
  },
  {
    path: 'panel/sales',
    canActivate: [AdminGuard],
    component: AdminSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
