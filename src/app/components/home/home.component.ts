import { Component, OnInit } from '@angular/core';
import { Category } from 'shared/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends CartService implements OnInit {
  categoriesWithProducts: Category[] = []
  
  constructor(
    protected categoryService: CategoryService
  ) {
    super()
    categoryService.listWithProducts().subscribe(response => this.categoriesWithProducts = response.data)
  }

  ngOnInit(): void {
    
  }
}
