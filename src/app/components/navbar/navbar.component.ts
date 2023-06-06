import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'shared/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: Category[] = []
  searchValue: string = ''
  constructor(
    protected categoryService: CategoryService,
    protected authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.categoryService.list().subscribe(response => this.categories = response.data.data)
  }

  get countCartItems(){
    const data = localStorage.getItem('cartItems')
    return data ? JSON.parse(data).length : 0
  }

  logOut(){
    this.authService.logOut()
  }
  toSearch(){
    this.router.navigate(['/search'], { queryParams: { name: this.searchValue } });
  }
}
