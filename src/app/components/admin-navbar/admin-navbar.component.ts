import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  logOut() {
    localStorage.removeItem("cartItems")
    localStorage.removeItem("token_shop_app")
    window.location.href = '/'

  }
}
