import { Injectable, signal } from '@angular/core';
import { Customer } from '../../shared/models/Customer';
import { LoginData } from '../../shared/constants/loginData';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Signal to hold the logged user data
  loggedUserData = signal<Customer | null>(null);

  constructor() {
    this.loadUserDataFromLocalStorage();
  }

  // Method to load user data from localStorage
  loadUserDataFromLocalStorage(): void {
    const isUser = localStorage.getItem(LoginData.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser) as Customer;
      this.loggedUserData.set(parseObj);
    }
  }

  // Method to save user data and store it in localStorage
  saveLoginUser(user: Customer): void {
    localStorage.setItem(LoginData.LOCAL_KEY, JSON.stringify(user));
    this.loggedUserData.set(user);
  }

  // Signal-based access to the current user data
  getUserData(): Customer | null {
    return this.loggedUserData();
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return this.loggedUserData() !== null;
  }

  // Method to log out the user
  logOut(): void {
    localStorage.removeItem(LoginData.LOCAL_KEY);
    this.loggedUserData.set(null);
  }
}
