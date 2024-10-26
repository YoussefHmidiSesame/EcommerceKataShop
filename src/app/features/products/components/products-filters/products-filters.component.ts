import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MasterService } from '../../../../core/services/master-service/master.service';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from '../../../../shared/models/Product';
import { Category } from '../../../../shared/models/Category';



@Component({
  selector: 'app-products-filters',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.css'
})
export class ProductsFiltersComponent implements OnInit {
  masterService = inject(MasterService);
  productList = signal<Product[]>([]); // Signal for the product list
  categoryList = signal<Category[]>([]);  // Signal to hold the category list
  private categorySubscription!: Subscription;


  ngOnInit(): void {
    // Load all categories into the categoryList signal
    this.categorySubscription = this.masterService.getAllCategory().subscribe((res) => {
      this.categoryList.set(res.data);
    });
  }

  sortByPrice(order: 'asc' | 'desc') {
    this.masterService.updateFilterCriteria(`price-${order}`);
  }

  getProductByCategoryId(id: number) {
    this.masterService.updateFilterCriteria(`category-${id}`);
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe(); // Unsubscribe from the single subscription
  }

}
