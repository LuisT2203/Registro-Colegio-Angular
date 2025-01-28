import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iingresopersonal } from '../model/iIngresoPersonal';
import { Observable } from 'rxjs';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class IngresopersonalService {

   private baseURL = "https://registro-colegio.onrender.com/ControladorPC";

 // private baseURL = "http://localhost:8080/ControladorPC";

  constructor(private http: HttpClient) { }

  listarIngresoPC(fechaBusqueda?: string, idPersonal?: number): Observable<MensajeResponse> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (idPersonal) {
      params = params.set('id_personal', idPersonal.toString());
    }
    return this.http.get<MensajeResponse>(`${this.baseURL}/listarIngresoPC`, { params });
  }

  insertarIPC(ipc: Iingresopersonal) {
    return this.http.post<MensajeResponse>(`${this.baseURL}/saveIPC`, ipc);
  }

  actualizarIPC(ipc: Iingresopersonal) {
    return this.http.put<MensajeResponse>(`${this.baseURL}/updateIPC`, ipc);
  }

  getIPC(id_ingresoPersonal: number) {
    return this.http.get<Iingresopersonal>(`${this.baseURL}/editarIPC/${id_ingresoPersonal}`);
  }

  eliminarIPC(id_ingresoPersonal: number) {
    return this.http.delete<MensajeResponse>(`${this.baseURL}/eliminarIPC/${id_ingresoPersonal}`);
  }
  exportPdfById(id_personal: number): Observable<Blob> {
    return this.http.get(`${this.baseURL}/export-pdf/${id_personal}`, { responseType: 'blob' });
  }
}
