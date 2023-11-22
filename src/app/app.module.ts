import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './views/components/home/home.component';
import { MedicoCreateComponent } from './views/components/medico/medico-create/medico-create';
import { MedicoDeleteComponent } from './views/components/medico/medico-delete/medico-delete';
import { MedicoReadComponent } from './views/components/medico/medico-read/medico-read';
import { MedicoUpdateComponent } from './views/components/medico/medico-update/medico-update';
import { PacienteCreateComponent } from './views/components/paciente/paciente-create/paciente-create.component';
import { PacienteDeleteComponent } from './views/components/paciente/paciente-delete/paciente-delete.component';
import { PacienteReadComponent } from './views/components/paciente/paciente-read/paciente-read.component';
import { PacienteUpdateComponent } from './views/components/paciente/paciente-update/paciente-update.component';
import { FooterComponent } from './views/components/template/footer/footer.component';
import { HeaderComponent } from './views/components/template/header/header.component';
import { NavComponent } from './views/components/template/nav/nav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';
import { Toast, ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './views/components/login/login.component';
import { AuthService } from './views/components/login/login.service';
import { AuthGuard } from './views/components/guard/AuthGuard';
import { AtendimentoReadComponent } from './views/components/registro/atendimento-read/atendimento-read.component';
import { AtendimentoCreateComponent } from './views/components/registro/atendimento-create/atendimento-create.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AtendimentoUpdateComponent } from './views/components/registro/atendimento-update/atendimento-update.component';
import { AtendimentoDeleteComponent } from './views/components/registro/atendimento-delete/atendimento-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    PacienteReadComponent,
    PacienteCreateComponent,
    PacienteUpdateComponent,
    PacienteDeleteComponent,
    MedicoCreateComponent,
    MedicoReadComponent,
    MedicoDeleteComponent,
    MedicoUpdateComponent,
    LoginComponent,
    AtendimentoReadComponent,
    AtendimentoCreateComponent,
    AtendimentoUpdateComponent,
    AtendimentoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
