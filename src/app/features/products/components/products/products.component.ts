import { map, Observable, Subscription, tap } from 'rxjs';
import { MasterService } from '../../../../core/services/master-service/master.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductList } from '../../../../shared/models/ProductList';
import { ApiResponseModel } from '../../../../shared/models/ApiResponseModel';
import { CartModel } from '../../../../shared/models/CartModel';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingService } from '../../../../core/services/loading-service/loading.service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  //new way to inject service in ang 18 : no need to do the constructor injection
  masterService = inject(MasterService);
  authService = inject(AuthService); // Inject AuthService
  isLoading = signal<boolean>(false);

  //new way of using signals
  productList$: Observable<ProductList[]> = new Observable();
  subscriptionList: Subscription[] = [];
  snackBar = inject(MatSnackBar); // Inject MatSnackBar
  loadingService = inject(LoadingService); // Inject LoadingService
  loggedUserData = this.authService.getUserData(); // duplicated use fix it

  constructor() {
    this.authService.loadUserDataFromLocalStorage();
  }

  ngOnInit(): void {
    this.loggedUserData = this.authService.getUserData();
    this.loadAllProducts();
    const filterSubscription = this.masterService.filterObservable.subscribe(
      filterCriteria => {
        this.applyFilter(filterCriteria);
      }
    );

    this.subscriptionList.push(filterSubscription);
  }

  loadAllProducts() {
    this.loadingService.show(); // Show spinner
    this.productList$ = this.masterService.getAllProducts().pipe(
      map((res: ApiResponseModel) => {
        this.loadingService.hide(); // Hide spinner when data is loaded
        return res.data;
      })
    );
  }

  applyFilter(filterCriteria: string | null) {
    this.loadingService.show();
    if (!filterCriteria) return;

    if (filterCriteria.startsWith('price')) {
      const order = filterCriteria.split('-')[1];
      this.sortByPrice(order as 'asc' | 'desc');
    } else if (filterCriteria.startsWith('category')) {
      const categoryId = Number(filterCriteria.split('-')[1]);
      this.getProductByCategoryId(categoryId);
    }
  }

  getProductByCategoryId(id: number) {
    this.loadingService.show(); // Affiche le spinner
    this.productList$ = this.masterService.getAllProductsByCategoryId(id).pipe(
      tap(() => {
        this.loadingService.hide();
      }),
      map((res: ApiResponseModel) => {
        return res.data;
      })
    );
  }

  sortByPrice(order: 'asc' | 'desc') {
    this.productList$ = this.productList$.pipe(
      map(products => {
        return products.sort((a, b) => {
          return order === 'asc'
            ? a.productPrice - b.productPrice
            : b.productPrice - a.productPrice;
        });
      })
    );
  }
  onAddToCart(id: number) {
    const newObj: CartModel = new CartModel();
    newObj.ProductId = id;
    newObj.CustId = this.loggedUserData!.custId; // Use non-null assertion
    this.masterService.addToCart(newObj).subscribe((res: ApiResponseModel) => {
      if (res.result) {
        this.snackBar.open('Product Added to Cart', 'Close', {
          duration: 3000
        }); // Toast on success
        //emit true value in subject
        this.masterService.onAddedToCard.next(true);
      } else {
        this.snackBar.open(res.message, 'Close', { duration: 3000 }); // Toast on error
      }
    });
  }

  ngOnDestroy(): void {
    //unsubscribe de toutes les observables dans notre list de souscription
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    });
  }
}
