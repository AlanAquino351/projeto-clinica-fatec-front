import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login.service';
import { User } from 'src/app/models/user';
import { MensagemService } from 'src/app/services/mensagem.service';
import { MedicoService } from 'src/app/services/medico.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    login: '',
    password: '',
  }

  constructor(private mensagem: MensagemService, private authService: AuthService,
    private router: Router, private medicoService: MedicoService) { }

  ngOnInit(): void {

  }

  public logar() {
    if (this.isBlankOrNull(this.user.login) || this.isBlankOrNull(this.user.password)) {
      this.mensagem.error("Usuário e Senha obrigatórios!");
    } else {

      if (this.user.password == 'admin' && this.user.login === 'admin') {
        this.mensagem.success("Acesso Autorizado com sucesso!");
        this.authService.loginAdmin();
      } else {
        this.medicoService.findUsuarioMedicoByCrm(this.user.login).subscribe((resposta) => {
          if (resposta != null && this.user.password == '1234') {
            this.mensagem.success("Acesso Autorizado com sucesso!");
            this.authService.login(resposta);
          } else {
            this.mensagem.error("Usuário não existe!");
          }
        }, err => {
          this.mensagem.error("Usuário não existe!");
        })
      }
    }
  }

  private isBlankOrNull(value: String): boolean {
    return value == null || value.trim() == '';
  }
}
