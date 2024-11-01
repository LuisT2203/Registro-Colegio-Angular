import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipersonalcolegio } from '../model/iPersonalColegio';
import { map } from 'rxjs';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonalcolegioService {
//  private baseURL = "https://registro-colegio.onrender.com/ControladorPC";

  private baseURL = "http://localhost:8080/ControladorPC";

  constructor(private http: HttpClient) { }

  getPCS() {
    return this.http.get<MensajeResponse>(`${this.baseURL}/listarPC`);
  }

  getPC(id_personal: number) {
    return this.http.get<Ipersonalcolegio>(`${this.baseURL}/editarPC/${id_personal}`);
  }

  insertarPC(PersonalC: Ipersonalcolegio) {
    return this.http.post<MensajeResponse>(`${this.baseURL}/savePC`, PersonalC);
  }

  actualizarPC(PersonalC: Ipersonalcolegio) {
    return this.http.put<MensajeResponse>(`${this.baseURL}/updatePC`, PersonalC);
  }

  eliminarPC(id_personal: number) {
    return this.http.delete<MensajeResponse>(`${this.baseURL}/eliminarPC/${id_personal}`);
  }
}

