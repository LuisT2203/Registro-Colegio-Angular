import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../model/iUsuario';
import { MensajeResponse } from '../model/MensajeResponse';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'https://registro-colegio.onrender.com/api/usuario';
  //private baseUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: IUsuario){
    // Indicamos que la respuesta será de tipo texto, pero devolvemos un tipo 'string'
    return this.http.post<MensajeResponse>(`${this.baseUrl}/save`, usuario);
  }
}
