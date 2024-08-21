import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'https://registro-colegio.onrender.com/api/usuario/login';
  private tokenKey = 'authToken';

  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(correo: string, clave: string): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, { correo, clave }).pipe(
      tap(response =>{
        if(response.token){
          console.log(response.token)
          this.setToken(response.token)
        }
      })
    );
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }

}
