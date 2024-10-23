import {
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HomeComponent } from './core/layout/home/home.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/loading-service/loading.service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule,HeaderComponent,FooterComponent,HomeComponent,LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  title = 'ecommerceapp';

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }
}
