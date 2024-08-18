import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ippff } from '../model/iPPFF';

@Injectable({
  providedIn: 'root'
})
export class PpffService {
  private baseURL = "https://registro-colegio.onrender.com/ControladorPPFF";

  constructor(private http: HttpClient) { }
  getPPFFS() {
    return this.http.get<Ippff[]>(`${this.baseURL}/listarPPFF`);
  }

  getPPFF(id_ppff: number) {
    return this.http.get<Ippff>(`${this.baseURL}/editarPPFF/${id_ppff}`);
  }

  insertarPPFF(PPFF: Ippff) {
    return this.http.post<Ippff>(`${this.baseURL}/savePPFF`, PPFF);
  }

  actualizarPPFF(PPFF: Ippff) {
    return this.http.put<Ippff>(`${this.baseURL}/updatePPFF`, PPFF);
  }

  eliminarPPFF(id_ppff: number) {
    return this.http.delete(`${this.baseURL}/eliminarPPFF/${id_ppff}`);
  }
}
