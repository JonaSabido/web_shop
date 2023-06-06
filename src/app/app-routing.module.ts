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

const routes: Routes = [
  {
    path: '',
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
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent
  },
  {
    path: 'panel/products',
    canActivate: [AdminGuard],
    component: AdminProductsComponent
  },
  {
    path: 'panel/users',
    canActivate: [AdminGuard],
    component: AdminUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
