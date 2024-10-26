import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../../shared/models/Product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) {}

}
