import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends CartService implements OnInit {
  products: Product[] = []
  searchQuery: string = '';
  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['name'] || '';
      this.productService.search(this.searchQuery).subscribe(response => {
        this.products = response.data;
      });
    })
  }
}
