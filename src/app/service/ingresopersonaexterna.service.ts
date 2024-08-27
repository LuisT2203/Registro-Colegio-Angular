import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IingresopersonaE } from '../model/iIngresoPersonaE';

@Injectable({
  providedIn: 'root'
})
export class IngresopersonaexternaService {


 // private baseURL = "https://registro-colegio.onrender.com/ControladorPE";
  private baseURL = "http://localhost:8080/ControladorPE";

  constructor(private http: HttpClient) { }

  listarIngresoPE(fechaBusqueda?: string, idPersonaE?: number): Observable<any[]> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (idPersonaE) {
      params = params.set('id_personaE', idPersonaE.toString());
    }
    return this.http.get<any[]>(`${this.baseURL}/listarIngresoPE`, { params });
  }

  insertarIPE(ipc: IingresopersonaE) {
    return this.http.post<IingresopersonaE>(`${this.baseURL}/saveIPE`, ipc);
  }

  actualizarIPE(ipc: IingresopersonaE) {
    return this.http.put<IingresopersonaE>(`${this.baseURL}/updateIPE`, ipc);
  }

  getIPE(id_ingresoPersonaE: number) {
    return this.http.get<IingresopersonaE>(`${this.baseURL}/editarIPE/${id_ingresoPersonaE}`);
  }

  eliminarIPE(id_ingresoPersonaE: number) {
    return this.http.delete<void>(`${this.baseURL}/eliminarIPE/${id_ingresoPersonaE}`);
  }
}
