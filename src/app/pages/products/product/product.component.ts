import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productSvc: ProductsService) {}

  ngOnInit(): void {
    this.productSvc
      .getProducts()
      .pipe(tap((res) => console.log(res)))
      .subscribe();
  }
}
