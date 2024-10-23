import { Component, computed, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { MasterService } from '../../core/services/master-service/master.service';
import { FormsModule } from '@angular/forms';
import { OrderModel } from '../../shared/models/OrderModel';
import { ApiResponseModel } from '../../shared/models/ApiResponseModel';
import { AuthService } from '../../core/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { map, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,MatSnackBarModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  masterservice = inject(MasterService);
  authService = inject(AuthService); // Inject AuthService
  router = inject(Router); // Inject Router
  snackBar = inject(MatSnackBar); // Inject MatSnackBar
  loggedUserData = this.authService.getUserData(); // Use AuthService
  masterService = inject(MasterService);


  //cartData: any[] = [];
  totalAmount: number = 0;
  orderObj: OrderModel = new OrderModel();
  destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>(); // Subject to track component destruction

  // Directly convert the observable to a signal
  cartData$ = toSignal(this.masterservice.getCartProductsByCustomerId(this.loggedUserData!.custId).pipe(
    map((res: ApiResponseModel) => res.data)
  ),{initialValue:[]});

  totalAmount$ = computed(() =>
    this.cartData$()?.reduce((acc: any, item: { productPrice: any; }) => acc + item.productPrice, 0)
  );

  e = effect(()=>{
    console.log("totalAmount",this.totalAmount$())
  });



  constructor(){
    this.authService.loadUserDataFromLocalStorage();
  }


  ngOnInit(): void {
  }

  placeOrder(){
    this.orderObj.CustId=this.loggedUserData!.custId;
    this.orderObj.TotalInvoiceAmount=this.totalAmount$();
    this.masterservice.onPlaceOrder(this.orderObj)
    .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
    .subscribe((res:ApiResponseModel)=>{
      if(res.result){
        this.snackBar.open('Order placed successfully ! ', 'Close', { duration: 3000 }); // Toast on success
        //emit true value in subject
        this.masterService.onAddedToCard.next(true);//clear the nav bar add cart section in the header
        this.orderObj=new OrderModel();
        this.router.navigate(['/my-orders']);
      }else{
        this.snackBar.open(res.message, 'Close', { duration: 3000 }); // Toast on error
      }
    })

  }

  // Clean up subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
