import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from './../../../../models/paciente';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  paciente: Paciente = {
    id: '',
    nome: '',
    cns: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
  }
 
  nome = new FormControl('',[Validators.minLength(5)])
  cns = new FormControl('',[Validators.minLength(11)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(10)])
  dataNascimento = new FormControl('',[Validators.minLength(10)])


  constructor(
    private router : Router,
    private service: PacienteService,
    private mensagem: MensagemService) { }

  ngOnInit(): void {
    console.log('Init')
  }

  cancel():void {
    this.router.navigate(['pacientes'])
  }

  create():void {
    console.log('Creating')
    this.service.create(this.paciente).subscribe((resposta) => {
      this.router.navigate(['pacientes'])
      this.mensagem.success('Paciente cadastrado com Sucesso! :)')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.mensagem.error(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.mensagem.error(err.error.errors[0].message);
      }
    })
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return "O campo deve ter no minimo 5 letras e não é permitido caracteres especiais"
    } 
    return false;
  }

  errorValidCns() {
    if (this.cns.invalid) {
      return "O campo deve ter no minimo 12 dígitos"
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