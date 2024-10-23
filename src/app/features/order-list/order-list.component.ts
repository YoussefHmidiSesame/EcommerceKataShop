import { LoadingService } from './../../core/services/loading-service/loading.service.service';
import { Component, inject, OnInit } from '@angular/core';

import { AsyncPipe, CommonModule } from '@angular/common';
import { OrderPerUser } from '../../shared/models/OrderPerUser';
import { MasterService } from '../../core/services/master-service/master.service';
import { ApiResponseModel } from '../../shared/models/ApiResponseModel';
import { AuthService } from '../../core/auth/auth.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule,AsyncPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{
  masterservice = inject(MasterService);
  authService = inject(AuthService); // Inject AuthService
  loadingService = inject(LoadingService);
  loggedUserData = this.authService.getUserData(); // Use AuthService


  orders$:Observable<OrderPerUser[]> = new Observable();
  isLoading=true;
  hasError=false;


  ngOnInit(): void {
    this.loggedUserData = this.authService.getUserData();
    this.loadCustomerOrders()

  }

  constructor(){
    this.authService.loadUserDataFromLocalStorage();
  }


  loadCustomerOrders(){
    this.loadingService.show(); // Show the spinner when loading starts
    this.orders$=this.masterservice.getOrders(this.loggedUserData!.custId).pipe(
      map((res:ApiResponseModel)=>{
        this.loadingService.hide();
        return res.data;
      })
    )
  }
}
