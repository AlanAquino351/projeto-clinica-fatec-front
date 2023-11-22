import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { MensagemService } from 'src/app/services/mensagem.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

  id_cli = ''
  

  paciente: Paciente = {
    id: '',
    nome: '',
    cns:'',
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
    private route: ActivatedRoute,
    private mensagem: MensagemService) { }

  ngOnInit(): void {

    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  update(): void {

    this.service.update(this.paciente).subscribe((resposta) => {

      this.router.navigate(['pacientes'])
      this.mensagem.success('Paciente atualizado com sucesso!')

    }, err => {
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.mensagem.error(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.mensagem.error(err.error.errors[0].message);
      }
    })
  }

  findById(): void {

    this.service.findById(this.id_cli).subscribe(resposta => {

      this.paciente = resposta;

    })
  }

  cancel():void {
    this.router.navigate(['pacientes'])
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O campo deve ter no minimo 5 letras e não é permitido caracteres especiais'
    }
    return false;
  }
  errorValidCns() {
    if (this.cns.invalid) {
      return 'O campo deve ter no minimo 12 números'
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
