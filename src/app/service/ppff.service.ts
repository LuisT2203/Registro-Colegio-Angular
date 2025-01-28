import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ippff } from '../model/iPPFF';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class PpffService {
  private baseURL = "https://registro-colegio.onrender.com/ControladorPPFF";

//  private baseURL = "http://localhost:8080/ControladorPPFF";

  constructor(private http: HttpClient) { }
  getPPFFS() {
    return this.http.get<MensajeResponse>(`${this.baseURL}/listarPPFF`);
  }

  getPPFF(id_ppff: number) {
    return this.http.get<Ippff>(`${this.baseURL}/editarPPFF/${id_ppff}`);
  }

  insertarPPFF(PPFF: Ippff) {
    return this.http.post<MensajeResponse>(`${this.baseURL}/savePPFF`, PPFF);
  }

  actualizarPPFF(PPFF: Ippff) {
    return this.http.put<MensajeResponse>(`${this.baseURL}/updatePPFF`, PPFF);
  }

  eliminarPPFF(id_ppff: number) {
    return this.http.delete<MensajeResponse>(`${this.baseURL}/eliminarPPFF/${id_ppff}`);
  }
}
