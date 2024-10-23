import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponseModel } from '../../shared/models/ApiResponseModel';
import { Customer } from '../../shared/models/Customer';
import { LoginModel } from '../../shared/models/LoginModel';
import { CartModel } from '../../shared/models/CartModel';
import { OrderModel } from '../../shared/models/OrderModel';



@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';

  //use of subject to dynamically render added card item
  onAddedToCard: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllProducts');
  }

  getAllCategory(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllCategory ');
  }

  getAllProductsByCategoryId(categoryId: number): Observable<ApiResponseModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<ApiResponseModel>(url);
  }

  registerNewCustomer(obj: Customer): Observable<ApiResponseModel> {
    debugger;
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<ApiResponseModel>(url, obj);
  }

  onLogin(obj: LoginModel): Observable<ApiResponseModel> {
    debugger;
    const url = `${this.apiUrl}Login`;
    return this.http.post<ApiResponseModel>(url, obj);
  }

  addToCart(obj: CartModel): Observable<ApiResponseModel> {
    debugger;
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<ApiResponseModel>(url, obj);
  }

  getCartProductsByCustomerId(
    loggedUserId: number
  ): Observable<ApiResponseModel> {
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    return this.http.get<ApiResponseModel>(url);
  }

  deleteProductFromCartById(productId: number): Observable<ApiResponseModel> {
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${productId}`;
    return this.http.get<ApiResponseModel>(url);
  }

  // use of subject to track filter changes
  //Todo Revoir le behaviroSubject en profondeur !
  private filterSubject = new BehaviorSubject<string | null>(null);

  // Observable to subscribe to filter changes
 //voir en profondeur si y a une meilleure approche
  filterObservable = this.filterSubject.asObservable();


  //voir cette nouvelle approche des get !
  // get filter$(){
  //   return this.filterSubject.asObservable();
  // }

  // Update filter criteria ( 'price', 'categoryId')
  updateFilterCriteria(criteria: string | null) {
    this.filterSubject.next(criteria);
  }

  onPlaceOrder(obj: OrderModel): Observable<ApiResponseModel> {
    debugger;
    const url = `${this.apiUrl}PlaceOrder`;
    return this.http.post<ApiResponseModel>(url, obj);
  }

  getOrders(loggedUserId: number): Observable<ApiResponseModel> {
    debugger;
    const url = `${this.apiUrl}GetAllSaleByCustomerId?id=${loggedUserId}`;
    return this.http.get<ApiResponseModel>(url);
  }


}
