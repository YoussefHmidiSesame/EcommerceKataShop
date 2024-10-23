import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products-list/products-list.component';
import { OrderComponent } from './features/order/order.component';

import { ProductsComponent } from './features/products/products.component';
import { OrderListComponent } from './features/order-list/order-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './core/layout/home/home.component';

export const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch :'full'

  },
  {
    path :'home',
    component : HomeComponent
  },
  {
    path :'products-list',
    component : ProductsListComponent
  },
  {
    path : 'pass-order',
    component : OrderComponent
  },
  {
    path: 'my-orders',
    component : OrderListComponent
  },
  {
    path: 'contact',
    component : ContactComponent
  }
];
