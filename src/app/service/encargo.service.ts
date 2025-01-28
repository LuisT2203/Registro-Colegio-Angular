import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iencargo } from '../model/iencargo';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class EncargoService {

 // private baseURL = "http://localhost:8080/ControladorEncargo";

 private baseURL = "https://registro-colegio.onrender.com/ControladorEncargo";

  constructor(private http: HttpClient) { }

  listarEncargos(fechaBusqueda?: string, encargoNom?: string): Observable<MensajeResponse> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (encargoNom) {
      params = params.set('encargoNom', encargoNom);
    }
    return this.http.get<MensajeResponse>(`${this.baseURL}/listarEncargos`, { params });
  }

  insertarEnc(enc: Iencargo) {
    return this.http.post<MensajeResponse>(`${this.baseURL}/saveEncargo`, enc);
  }

  actualizarEnc(enc: Iencargo) {
    return this.http.put<MensajeResponse>(`${this.baseURL}/updateEncargo`, enc);
  }

  getEnc(id_enc: number) {
    return this.http.get<Iencargo>(`${this.baseURL}/editarE/${id_enc}`);
  }

  eliminarEnc(id_enc: number) {
    return this.http.delete<MensajeResponse>(`${this.baseURL}/eliminarE/${id_enc}`);
  }
}
