import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iingresoppff } from '../model/iIngresoPPFF';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class IngresoppffService {

  private baseURL = "https://registro-colegio.onrender.com/ControladorPPFF";

// private baseURL = "http://localhost:8080/ControladorPPFF";

  constructor(private http: HttpClient) { }

  listarIngresoPF(fechaBusqueda?: string, idPadre?: number): Observable<MensajeResponse> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (idPadre) {
      params = params.set('id_ppff', idPadre.toString());
    }
    return this.http.get<MensajeResponse>(`${this.baseURL}/listarIPPFF`, { params });
  }

  insertarIPF(ipf: Iingresoppff) {
    return this.http.post<MensajeResponse>(`${this.baseURL}/saveIPPFF`, ipf);
  }

  actualizarIPF(ipf: Iingresoppff) {
    return this.http.put<MensajeResponse>(`${this.baseURL}/updateIPPFF`, ipf);
  }

  getIPF(id_ingresoPPFF: number) {
    return this.http.get<Iingresoppff>(`${this.baseURL}/editarIPPFF/${id_ingresoPPFF}`);
  }

  eliminarIPF(id_ingresoPPFF: number) {
    return this.http.delete<MensajeResponse>(`${this.baseURL}/eliminarIPPFF/${id_ingresoPPFF}`);
  }
  exportPdfById(id_ppff: number): Observable<Blob> {
    return this.http.get(`${this.baseURL}/export-pdf/${id_ppff}`, { responseType: 'blob' });
  }
}
