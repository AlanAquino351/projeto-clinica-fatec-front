import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Atendimento } from 'src/app/models/atendimento';
import { Paciente } from 'src/app/models/paciente';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-atendimento-delete',
  templateUrl: './atendimento-delete.component.html',
  styleUrls: ['./atendimento-delete.component.css']
})
export class AtendimentoDeleteComponent implements OnInit {

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
  listExames = '';
  listMedicamentos = '';

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router,
    private route: ActivatedRoute,
    private mensagem: MensagemService
  ) { }

  ngOnInit(): void {
    this.idAtendimento = this.route.snapshot.paramMap.get('id')!;
    this.loadAtendimento();
  }

  loadAtendimento(): void {
    this.atendimentoService.findById(this.idAtendimento).subscribe(
      (atendimento: Atendimento) => {
        this.atendimento = atendimento;
        this.listExames = this.atendimento.exames.map(exame => exame.nome).join(', ');
        this.listMedicamentos = this.atendimento.medicamentos.map(medicamento => medicamento.nome).join(', ');
      },
      (error: any) => {
        console.error('Erro ao carregar atendimento:', error);
      }
    );
  }
  
  delete(): void {
    this.atendimentoService.delete(this.idAtendimento).subscribe(resposta => {
      this.router.navigate(['atendimentos'])
      this.mensagem.success('Atendimento deletato com sucesso!')
    }, err => {
      console.log(err)
    })
  }

  cancel(): void {
    this.router.navigate(['atendimentos']);
  }
}
