import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar) { }

  findAll():Observable<Medico[]> {
    const url = this.baseUrl + "/medico";
    return this.http.get<Medico[]>(url);
  }

  findById(id : any): Observable<Medico>{
    const url = `${this.baseUrl}/medico/${id}`;
    return this.http.get<Medico>(url);
  }

  create(medico: Medico):Observable<Medico> {
    const url = this.baseUrl + "/medico";
    return this.http.post<Medico>(url, medico);
  }

  update(medico: Medico): Observable<Medico> {
    const url = `${this.baseUrl}/medico/${medico.id}`;
    return this.http.put<Medico>(url, medico);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/medico/${id}`;
    return this.http.delete<void>(url);
  }

  findUsuarioMedicoByCrm(crm : any):Observable<Medico> {
    const url = `${this.baseUrl}/medico/usuario/${crm}`;
    return this.http.get<Medico>(url);
  }
}