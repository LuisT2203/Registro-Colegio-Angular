import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  nombre: string;
  correo: string;
  clave: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'https://registro-colegio.onrender.com/api/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/registro`, usuario);
  }
}
