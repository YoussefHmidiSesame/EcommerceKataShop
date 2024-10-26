import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) { // Vérifie si l'utilisateur est connecté
      return true;
    } else {
      this.router.navigate(['/contact']); // Redirige vers la page home de connexion si non connecté
      return false;
    }
  }
}
