import { Component, OnInit, inject } from '@angular/core';

import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { MasterService } from '../../services/master-service/master.service';
import { CartData } from '../../../shared/models/CartData';
import { LoginModel } from '../../../shared/models/LoginModel';
import { Customer } from '../../../shared/models/Customer';
import { ApiResponseModel } from '../../../shared/models/ApiResponseModel';
import { LoginData } from '../../../shared/constants/loginData';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,AsyncPipe,MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  masterService = inject(MasterService);
  authService = inject(AuthService); // Inject AuthService
  router = inject(Router); // Inject Router
  snackBar = inject(MatSnackBar); // Inject MatSnackBar
  cartData: CartData[] = [];

  // State variables to control modal visibility
  isRegisterModalOpen: boolean = false;
  isLoginModalOpen: boolean = false;


  loginObj: LoginModel = new LoginModel();
  registerObj: Customer = new Customer();

  loggedUserData = this.authService.getUserData(); // Use AuthService
  cartData$: Observable<CartData[] | null> | null = null;

  isCartPopupOpen: boolean = false;

  // Subject pour signaler et annuler les souscriptions : methode en utilisant le takeUtil mais on met notre propre subject
  private ngUnsubscribe = new Subject<void>();

  constructor(){
    this.authService.loadUserDataFromLocalStorage();
  }

  ngOnInit(): void {
      this.getCartItems();
    //subscribe to subject to enable a dynamic rendering
    this.masterService.onAddedToCard.subscribe((res: boolean) => {
      if (res) {
        this.getCartItems();
      }
    });
  }

  getCartItems() {
    if (this.loggedUserData) {
      this.cartData$ = this.masterService.getCartProductsByCustomerId(this.loggedUserData.custId).pipe(
        map((res: ApiResponseModel) => res.data)
      );
    }
  }

  openRegisterModelPopup() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModelPopup() {
    this.isRegisterModalOpen = false;
  }

  openLoginModelPopup() {
    this.isLoginModalOpen = true;
  }

  closeLoginModelPopup() {
    this.isLoginModalOpen = false;
  }

  async showAddCartPopup() {
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }


  onRemoveProductFromCard(cardId: number) {
    this.masterService
      .deleteProductFromCartById(cardId)
      .pipe(takeUntil(this.ngUnsubscribe)) // Fermeture automatique de la souscription
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          this.snackBar.open('Product removed from cart', 'Close', { duration: 3000 }); // Toast on success
          this.getCartItems();
        } else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 }); // Toast on error
        }
      });
  }

  onRegister() {
    this.masterService
      .registerNewCustomer(this.registerObj)
      .pipe(takeUntil(this.ngUnsubscribe)) // Fermeture automatique de la souscription
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          this.snackBar.open('Registration Success', 'Close', { duration: 3000 }); // Toast on success
          this.closeRegisterModelPopup();
        } else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 }); // Toast on error
        }
      });
  }

  onLogin() {
    this.masterService
      .onLogin(this.loginObj)
      .pipe(takeUntil(this.ngUnsubscribe)) // Fermeture automatique de la souscription
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          this.loggedUserData = res.data;
          this.getCartItems();
          localStorage.setItem(LoginData.LOCAL_KEY, JSON.stringify(res.data));
          this.snackBar.open('Login Successful', 'Close', { duration: 3000 });
          this.closeLoginModelPopup();
        } else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });
        }
      });
  }

  logOut() {
    this.authService.logOut();
     this.loggedUserData = null;
    if (this.isCartPopupOpen) {
      this.showAddCartPopup();
    }
    this.cartData$=of([]);
    this.router.navigate(['/home']); // Navigate to home or any desired route
}

// Annuler toutes les souscriptions lors de la destruction du composant
ngOnDestroy(): void {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

}
