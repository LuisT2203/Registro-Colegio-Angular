import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iencargo } from '../model/iencargo';

@Injectable({
  providedIn: 'root'
})
export class EncargoService {

  private baseURL = "http://localhost:8080/ControladorEncargo";

  constructor(private http: HttpClient) { }

  listarEncargos(fechaBusqueda?: string, encargoNom?: string): Observable<any[]> {
    let params = new HttpParams();
    if (fechaBusqueda) {
      params = params.set('fechaBusqueda', fechaBusqueda);
    }
    if (encargoNom) {
      params = params.set('encargoNom', encargoNom);
    }
    return this.http.get<any[]>(`${this.baseURL}/listarEncargos`, { params });
  }

  insertarEnc(enc: Iencargo) {
    return this.http.post<Iencargo>(`${this.baseURL}/saveEncargo`, enc);
  }

  actualizarEnc(enc: Iencargo) {
    return this.http.put<Iencargo>(`${this.baseURL}/updateEncargo`, enc);
  }

  getEnc(id_enc: number) {
    return this.http.get<Iencargo>(`${this.baseURL}/editarE/${id_enc}`);
  }

  eliminarEnc(id_enc: number) {
    return this.http.delete<void>(`${this.baseURL}/eliminarE/${id_enc}`);
  }
}
