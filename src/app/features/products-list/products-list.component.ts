import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { ProductsFiltersComponent } from '../products-filters/products-filters.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsComponent, ProductsFiltersComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

}
