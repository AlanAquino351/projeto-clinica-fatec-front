import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../models/atendimento';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient) { }

    findAllByMedico(crm: any):Observable<Atendimento[]> {
      const url = `${this.baseUrl}/atendimento/crm/${crm}`;
    return this.http.get<Atendimento[]>(url);
  }

  findById(id : any): Observable<Atendimento>{
    const url = `${this.baseUrl}/atendimento/${id}`;
    return this.http.get<Atendimento>(url);
  }

  create(atendimento: Atendimento):Observable<Atendimento> {
    const url = this.baseUrl + "/atendimento";
    return this.http.post<Atendimento>(url, atendimento);
  }

  update(atendimento: Atendimento): Observable<Atendimento> {
    const url = `${this.baseUrl}/atendimento/${atendimento.id}`;
    return this.http.put<Atendimento>(url, atendimento);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/atendimento/${id}`;
    return this.http.delete<void>(url);
  }
}