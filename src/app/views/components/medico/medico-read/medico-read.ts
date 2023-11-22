import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Medico } from 'src/app/models/medico';

import { MedicoService } from 'src/app/services/medico.service.ts.service';

@Component({
  selector: 'app-medico-read',
  templateUrl: './medico-read.html',
  styleUrls: ['./medico-read.css']
})
export class MedicoReadComponent implements AfterViewInit {

    medicos: Medico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'crm', 'cpf', 'nascimento', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Medico>(this.medicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : MedicoService,
    private router : Router) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.medicos = resposta;
      this.dataSource = new MatTableDataSource<Medico>(this.medicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void{
    this.router.navigate(['medicos/create'])
  }
}