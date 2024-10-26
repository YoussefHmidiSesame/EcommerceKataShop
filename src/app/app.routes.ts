import { Routes } from '@angular/router';
import { OrderComponent } from './features/pass-order/order.component';

import { ProductsComponent } from './features/products/components/products/products.component';
import { OrderListComponent } from './features/orders-list/order-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './core/layout/home/home.component';
import { ContainerProductsComponent } from './features/products/container/container.component';

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
    component : ContainerProductsComponent
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
