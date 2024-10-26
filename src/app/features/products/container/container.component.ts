import { Component } from '@angular/core';
import { ProductsComponent } from '../components/products/products.component';
import { ProductsFiltersComponent } from '../components/products-filters/products-filters.component';

@Component({
  selector: 'app-products-container',
  standalone: true,
  imports: [ProductsComponent, ProductsFiltersComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerProductsComponent {

}
