import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medico } from 'src/app/models/medico';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private medico: Medico | null = null;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get medicoLogado() {
    return this.medico;
  }

  constructor(private router: Router) {}

  login(medico: Medico) {
    this.medico = medico;
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  logout() {
    this.loggedIn.next(false);
    this.medico = null;
    this.router.navigate(['/']);
  }
}