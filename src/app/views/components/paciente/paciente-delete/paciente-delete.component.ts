import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { MensagemService } from 'src/app/services/mensagem.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-delete',
  templateUrl: './paciente-delete.component.html',
  styleUrls: ['./paciente-delete.component.css']
})
export class PacienteDeleteComponent implements OnInit {

  id_cli = ''


  paciente: Paciente = {
    id: '',
    nome: '',
    cns:'',
    cpf: '',
    telefone: '',
    dataNascimento: ''
  }

  constructor(
    private router: Router,
    private service: PacienteService,
    private route: ActivatedRoute,
    private mensagem: MensagemService) { }

  ngOnInit(): void {

    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();


  }

  findById(): void {

    this.service.findById(this.id_cli).subscribe(resposta => {

      this.paciente = resposta;

    })
  }

  delete(): void {
    //id que passou na url
    this.service.delete(this.id_cli).subscribe(resposta => {

      this.router.navigate(['pacientes'])
      this.mensagem.success('Paciente deletato com sucesso!')

    }, err => {

      console.log(err)

    })
  }

  cancel(): void {
    this.router.navigate(['pacientes'])
  }

}

