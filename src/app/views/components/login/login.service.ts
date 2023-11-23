import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medico } from 'src/app/models/medico';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private medico: Medico | null = null;
  private admin: boolean = false;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get medicoLogado() {
    return this.medico;
  }

  get isAdmin() {
    return this.admin;
  }

  constructor(private router: Router) {}

  login(medico: Medico) {
    this.admin = false;
    this.medico = medico;
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  loginAdmin() {
    this.admin = true;
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  logout() {
    this.admin = false;
    this.loggedIn.next(false);
    this.medico = null;
    this.router.navigate(['/']);
  }
}