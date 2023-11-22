import { Component } from '@angular/core';
import { AuthService } from './views/components/login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(
    private authService: AuthService
  ) {}
  title = 'clinica';
  liberarAcesso:Observable<boolean> = this.authService.isLoggedIn;
}
