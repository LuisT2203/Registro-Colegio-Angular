import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iingresoppff } from '../model/iIngresoPPFF';

@Injectable({
  providedIn: 'root'
})
export class IngresoppffService {

  private baseURL = "https://registro-colegio.onrender.com/ControladorPPFF";

  constructor(private http: HttpClient) { }

  listarIngresoPF(fechaBusqueda?: string, idPadre?: number): Observable<any[]> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (idPadre) {
      params = params.set('id_ppff', idPadre.toString());
    }
    return this.http.get<any[]>(`${this.baseURL}/listarIPPFF`, { params });
  }

  insertarIPF(ipf: Iingresoppff) {
    return this.http.post<Iingresoppff>(`${this.baseURL}/saveIPPFF`, ipf);
  }

  actualizarIPF(ipf: Iingresoppff) {
    return this.http.put<Iingresoppff>(`${this.baseURL}/updateIPPFF`, ipf);
  }

  getIPF(id_ingresoPPFF: number) {
    return this.http.get<Iingresoppff>(`${this.baseURL}/editarIPPFF/${id_ingresoPPFF}`);
  }

  eliminarIPF(id_ingresoPPFF: number) {
    return this.http.delete<void>(`${this.baseURL}/eliminarIPPFF/${id_ingresoPPFF}`);
  }
}
