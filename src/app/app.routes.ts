import { Routes } from '@angular/router';
import { OrderComponent } from './features/pass-order/order.component';

import { ProductsComponent } from './features/products/components/products/products.component';
import { OrderListComponent } from './features/orders-list/order-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './core/layout/home/home.component';
import { ContainerProductsComponent } from './features/products/container/container.component';
import { AuthGuard } from './core/guards/auth.guard';

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
    component : ContainerProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'pass-order',
    component : OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders',
    component : OrderListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component : ContactComponent
  }
];
