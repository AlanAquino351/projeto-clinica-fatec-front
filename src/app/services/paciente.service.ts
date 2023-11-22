import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient) { }

  findAll():Observable<Paciente[]> {
    const url = this.baseUrl + "/paciente";
    return this.http.get<Paciente[]>(url);
  }

  findById(id : any): Observable<Paciente>{
    const url = `${this.baseUrl}/paciente/${id}`;
    return this.http.get<Paciente>(url);
  }

  create(paciente: Paciente):Observable<Paciente> {
    const url = this.baseUrl + "/paciente";
    return this.http.post<Paciente>(url, paciente);
  }

  update(paciente: Paciente): Observable<Paciente> {
    const url = `${this.baseUrl}/paciente/${paciente.id}`;
    return this.http.put<Paciente>(url, paciente);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/paciente/${id}`;
    return this.http.delete<void>(url);
  }
}