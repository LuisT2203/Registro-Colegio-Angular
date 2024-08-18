import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(correo: string, clave: string): Observable<any> {
    return this.http.post("https://registro-colegio.onrender.com/api/usuario/login", { correo, clave });
  }

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
}
}
