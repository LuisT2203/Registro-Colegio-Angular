import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iingresopersonal } from '../model/iIngresoPersonal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresopersonalService {

  private baseURL = "https://registro-colegio.onrender.com/ControladorPC";

  constructor(private http: HttpClient) { }

  listarIngresoPC(fechaBusqueda?: string, idPersonal?: number): Observable<any[]> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (idPersonal) {
      params = params.set('id_personal', idPersonal.toString());
    }
    return this.http.get<any[]>(`${this.baseURL}/listarIngresoPC`, { params });
  }

  insertarIPC(ipc: Iingresopersonal) {
    return this.http.post<Iingresopersonal>(`${this.baseURL}/saveIPC`, ipc);
  }

  actualizarIPC(ipc: Iingresopersonal) {
    return this.http.put<Iingresopersonal>(`${this.baseURL}/updateIPC`, ipc);
  }

  getIPC(id_ingresoPersonal: number) {
    return this.http.get<Iingresopersonal>(`${this.baseURL}/editarIPC/${id_ingresoPersonal}`);
  }

  eliminarIPC(id_ingresoPersonal: number) {
    return this.http.delete<void>(`${this.baseURL}/eliminarIPC/${id_ingresoPersonal}`);
  }
}
