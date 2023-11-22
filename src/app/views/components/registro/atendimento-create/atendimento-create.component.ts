import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Atendimento } from 'src/app/models/atendimento';
import { Exame } from 'src/app/models/exame';
import { Medicamento } from 'src/app/models/medicamento';
import { Paciente } from 'src/app/models/paciente';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { AuthService } from '../../login/login.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-atendimento-create',
  templateUrl: './atendimento-create.component.html',
  styleUrls: ['./atendimento-create.component.css']
})
export class AtendimentoCreateComponent implements OnInit{

  exames: Exame[] = [];
  medicamentos: Medicamento[] = [];
  pacientes: any[] = [];

  atendimento: Atendimento = {
    medico: { nome: '', cpf: '', telefone: '', dataNascimento: '', crm: '' },
    paciente: { nome: '', cpf: '', telefone: '', dataNascimento: '', cns: '' },
    receituario: '',
    exames: [],
    medicamentos: [],
    dataAtendimento: ''
  };

  paciente = new FormControl(null, [Validators.required]);
  receituario = new FormControl('', [Validators.required]);
  listExames = new FormControl();
  listMedicamentos = new FormControl();

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router,
    private dominioService: DominioService,
    private pacienteService: PacienteService,
    private authService: AuthService,
    private mensagem: MensagemService
  ) { }

  ngOnInit(): void {
    const medicoLogado = this.authService.medicoLogado;
    if (medicoLogado != null) {
      this.atendimento.medico = medicoLogado;
    }
    this.loadExames();
    this.loadMedicamentos();
    this.loadPacientes();
  }

  createAtendimento(): void {
    console.log('create this.atendimento',this.atendimento);
    this.atendimentoService.create(this.atendimento).subscribe(() => {
      this.router.navigate(['atendimentos']);
      this.mensagem.success('Atendimento cadastrado com Sucesso! :)')
    });
  }

  cancel(): void {
    this.router.navigate(['atendimentos']);
  }

  loadExames(): void {
    this.dominioService.getExames().subscribe(
      (exames: Exame[]) => {
        this.exames = exames;
        console.log('Exames:', this.exames); 
      },
      (error: any) => {
        console.error('Erro ao carregar exames:', error);
      }
    );
  }

  loadMedicamentos(): void {
    this.dominioService.getMedicamentos().subscribe(
      (medicamentos: Medicamento[]) => {
        this.medicamentos = medicamentos;
        console.log('medicamentos', this.medicamentos);
      },
      (error: any) => {
        console.error('Erro ao carregar medicamentos:', error);
      }
    );
  }

  loadPacientes(): void {
    this.pacienteService.findAll().subscribe(
      (pacientes: Paciente[]) => {
        this.pacientes = pacientes;
        console.log('pacientes', this.pacientes);
      },
      (error: any) => {
        console.error('Erro ao carregar pacientes:', error);
      }
    );
  }

  errorValidPaciente() {
    if (this.paciente.invalid) {
      return "Selecione um paciente";
    } 
    return false;
  }
  
  errorValidReceituario() {
    if (this.receituario.invalid) {
      return "Preencha o receituário"
    } 
    return false;
  }
}