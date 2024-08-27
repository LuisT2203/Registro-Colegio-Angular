import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipersonaexterna } from '../model/iPersonaExterna';

@Injectable({
  providedIn: 'root'
})
export class PersonaexternaService {

 private baseURL = "https://registro-colegio.onrender.com/ControladorPE";

  // private baseURL = "http://localhost:8080/ControladorPE";

  constructor(private http: HttpClient) { }

  getPES() {
    return this.http.get<Ipersonaexterna>(`${this.baseURL}/listarPE`);
  }

  getPE(id_personaE: number) {
    return this.http.get<Ipersonaexterna>(`${this.baseURL}/editarPE/${id_personaE}`);
  }

  insertarPE(PersonaE: Ipersonaexterna) {
    return this.http.post<Ipersonaexterna>(`${this.baseURL}/savePE`, PersonaE);
  }

  actualizarPE(PersonaE: Ipersonaexterna) {
    return this.http.put<Ipersonaexterna>(`${this.baseURL}/updatePE`, PersonaE);
  }

  eliminarPE(id_personaE: number) {
    return this.http.delete(`${this.baseURL}/eliminarPE/${id_personaE}`);
  }
}
