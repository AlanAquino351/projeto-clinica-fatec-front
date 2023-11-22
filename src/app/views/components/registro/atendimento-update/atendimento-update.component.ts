import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Atendimento } from 'src/app/models/atendimento';
import { Exame } from 'src/app/models/exame';
import { Medicamento } from 'src/app/models/medicamento';
import { Paciente } from 'src/app/models/paciente';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';

@Component({
  selector: 'app-atendimento-update',
  templateUrl: './atendimento-update.component.html',
  styleUrls: ['./atendimento-update.component.css']
})
export class AtendimentoUpdateComponent implements OnInit, OnDestroy {

  exames: Exame[] = [];
  medicamentos: Medicamento[] = [];
  pacientes: Paciente[] = [];
  idAtendimento: string = '';
  atendimento: Atendimento = {
    medico: { nome: '', cpf: '', telefone: '', dataNascimento: '', crm: '' },
    paciente: { nome: '', cpf: '', telefone: '', dataNascimento: '', cns: '' },
    receituario: '',
    exames: [],
    medicamentos: [],
    dataAtendimento: ''
  };

  paciente = new FormControl('', [Validators.required]);
  receituario = new FormControl('', [Validators.required]);
  listExames = new FormControl();
  listMedicamentos = new FormControl();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router,
    private route: ActivatedRoute,
    private dominioService: DominioService,
    private pacienteService: PacienteService,
    private mensagem: MensagemService
  ) { }

  ngOnInit(): void {
    this.idAtendimento = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      exames: this.dominioService.getExames(),
      medicamentos: this.dominioService.getMedicamentos(),
      pacientes: this.pacienteService.findAll(),
      atendimento: this.atendimentoService.findById(this.idAtendimento)
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      ({ exames, medicamentos, pacientes, atendimento }) => {
        this.exames = exames;
        this.medicamentos = medicamentos;
        this.pacientes = pacientes;
        this.atendimento = atendimento;
        this.preencherSelecionados();
      },
      (error: any) => {
        console.error('Erro ao carregar dados:', error);
      }
    );
  }

  preencherSelecionados(): void {
    const examesSelecionados: Exame[] = this.atendimento.exames.map(exame => {
      return this.exames.find(e => e.id === exame.id) || exame;
    });

    const medicamentosSelecionados: Medicamento[] = this.atendimento.medicamentos.map(medicamento => {
      return this.medicamentos.find(m => m.id === medicamento.id) || medicamento;
    });

    const pacienteSelecionado = this.pacientes.find(paciente => paciente.id === this.atendimento.paciente.id);

    if (pacienteSelecionado) {
      this.paciente.setValue(pacienteSelecionado);
    }

    this.atendimento.exames = examesSelecionados;
    this.atendimento.medicamentos = medicamentosSelecionados;
  }

  updateAtendimento(): void {
    this.atendimento.dataAtendimento = '';
    this.atendimentoService.update(this.atendimento).subscribe(
      () => {
        this.router.navigate(['atendimentos']);
        this.mensagem.success('Atendimento atualizado com Sucesso! :)');
      },
      (error: any) => {
        console.error('Erro ao atualizar atendimento:', error);
      }
    );
  }

  loadExames(): void {
    this.dominioService.getExames().subscribe(
      (exames: Exame[]) => {
        this.exames = exames;
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
      },
      (error: any) => {
        console.error('Erro ao carregar pacientes:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['atendimentos']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  errorValidPaciente() {
    if (this.paciente.invalid) {
      return "Selecione um paciente"
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