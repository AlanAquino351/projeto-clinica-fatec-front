import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoCreateComponent } from './views/components/medico/medico-create/medico-create';
import { MedicoDeleteComponent } from './views/components/medico/medico-delete/medico-delete';
import { MedicoReadComponent } from './views/components/medico/medico-read/medico-read';
import { MedicoUpdateComponent } from './views/components/medico/medico-update/medico-update';
import { PacienteCreateComponent } from './views/components/paciente/paciente-create/paciente-create.component';
import { PacienteDeleteComponent } from './views/components/paciente/paciente-delete/paciente-delete.component';
import { PacienteReadComponent } from './views/components/paciente/paciente-read/paciente-read.component';
import { PacienteUpdateComponent } from './views/components/paciente/paciente-update/paciente-update.component';

import { HomeComponent } from './views/components/home/home.component';
import { LoginComponent } from './views/components/login/login.component';
import { AuthGuard } from './views/components/guard/AuthGuard';
import { AtendimentoReadComponent } from './views/components/registro/atendimento-read/atendimento-read.component';
import { AtendimentoCreateComponent } from './views/components/registro/atendimento-create/atendimento-create.component';
import { AtendimentoUpdateComponent } from './views/components/registro/atendimento-update/atendimento-update.component';
import { AtendimentoDeleteComponent } from './views/components/registro/atendimento-delete/atendimento-delete.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    component: PacienteReadComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/create',
    component: PacienteCreateComponent, 
    canActivate: [AuthGuard]
  },

  {
    path: 'pacientes/update/:id',
    component: PacienteUpdateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes/delete/:id',
    component: PacienteDeleteComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'medicos',
    component: MedicoReadComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'medicos/create',
    component: MedicoCreateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'medicos/update/:id',
    component: MedicoUpdateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'medicos/delete/:id',
    component: MedicoDeleteComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'atendimentos',
    component: AtendimentoReadComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'atendimentos/create',
    component: AtendimentoCreateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'atendimentos/update/:id',
    component: AtendimentoUpdateComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'atendimentos/delete/:id',
    component: AtendimentoDeleteComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
