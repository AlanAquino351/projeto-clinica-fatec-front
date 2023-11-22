import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Atendimento } from "src/app/models/atendimento";
import { AtendimentoService } from "src/app/services/atendimento.service";
import { AuthService } from "../../login/login.service";

@Component({
    selector: 'atendimento-read',
    templateUrl: './atendimento-read.component.html',
    styleUrls: ['./atendimento-read.component.css']
  })
  export class AtendimentoReadComponent implements AfterViewInit {
  
    atendimentos: Atendimento[] = [];
  
    displayedColumns: string[] = ['id', 'medico', 'paciente', 'receituario', 'exames', 'medicamentos', 'dataAtendimento', 'action'];
    dataSource = new MatTableDataSource<Atendimento>(this.atendimentos);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(
      private atendimentoService: AtendimentoService,
      private router: Router,
      private authService: AuthService,
    ) {}
  
    ngAfterViewInit() {
      this.findAllByMedico();
    }
  
    findAllByMedico(): void {
      this.atendimentoService.findAllByMedico(this.authService.medicoLogado?.crm).subscribe((response) => {
        this.atendimentos = response;
        this.dataSource = new MatTableDataSource<Atendimento>(this.atendimentos);
        this.dataSource.paginator = this.paginator;
      });
    }
  
    navigateToCreate(): void {
      this.router.navigate(['atendimentos/create']);
    }
  }