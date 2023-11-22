import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medico.service.ts.service'
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-medico-update',
  templateUrl: './medico-update.html',
  styleUrls: ['./medico-update.css']
})
export class MedicoUpdateComponent implements OnInit {

  id_cli = ''
  
  medico: Medico = {
    id: '',
    nome: '',
    crm: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
  }

  nome = new FormControl('',[Validators.minLength(5)])
  crm = new FormControl('',[Validators.minLength(6)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(10)])
  dataNascimento = new FormControl('',[Validators.minLength(10)])

  constructor(
    private router : Router,
    private service: MedicoService,
    private route: ActivatedRoute,
    private mensagem: MensagemService) { }

  ngOnInit(): void {

    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  update(): void {

    this.service.update(this.medico).subscribe((resposta) => {

      this.router.navigate(['medicos'])
      this.mensagem.success('Médico atualizado com sucesso!')

    }, err => {
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.mensagem.error(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CRM) inválido"){
        this.mensagem.error(err.error.errors[0].message);
      }
    })
  }

  findById(): void {

    this.service.findById(this.id_cli).subscribe(resposta => {

      this.medico = resposta;

    })
  }

  cancel():void {
    this.router.navigate(['medicos'])
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O campo deve ter no minimo 5 letras e não é permitido caracteres especiais'
    }
    return false;
  }

  errorValidCrm() {
    if (this.crm.invalid) {
      return 'O campo deve ter 6 números'
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O campo deve ter 11 números'
    }
    return false;
  }

  errorValidDataNascimento() {
    if (this.dataNascimento.invalid) {
      return 'O campo deve ter 8 números'
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
}
