import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exame } from '../models/exame';
import { Medicamento } from '../models/medicamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient) { }

  getExames(): Observable<Exame[]> {
    const url = this.baseUrl + "/dominio/exames";
    return this.http.get<Exame[]>(url);
  }

  getMedicamentos(): Observable<Medicamento[]> {
    const url = this.baseUrl + "/dominio/medicamentos";
    return this.http.get<Medicamento[]>(url);
  }
}