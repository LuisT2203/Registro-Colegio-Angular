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
  private REFRESH_URL = 'https://registro-colegio.onrender.com/api/usuario/refresh';
  private refreshtokenKey = 'refreshToken';


//  private LOGIN_URL = 'http://localhost:8080/api/usuario/login';
//   private tokenKey = 'authToken';
 //  private REFRESH_URL = 'http://localhost:8080/api/usuario/refresh';
  // private refreshtokenKey = 'refreshToken';



  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, clave: string): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, { usuario, clave }).pipe(
      tap(response =>{
        if(response.token){
          const token = response.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const tipo = payload.tipo;
          const usuarioCorreo = payload.sub;

          this.setUserEmail(usuarioCorreo);
          this.setUserType(tipo);
          console.log(response.token)
          this.setToken(response.token)
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    );
  }
  setUserEmail(correo: string) {
    localStorage.setItem('userEmail', correo); // O donde desees guardar el correo
  }
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail'); // O donde hayas guardado el correo
  }
  private setUserType(tipo: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('userType', tipo);
    }
  }

  getUserType(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('userType');
    }
    return null;
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

   getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private setRefreshToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.refreshtokenKey, token);
    }
  }

   getRefreshToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.refreshtokenKey);
    }
    return null;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken()
    return this.http.post<any>(this.REFRESH_URL, { refreshToken }).pipe(
      tap(response =>{
        if(response.token){
          console.log(response.token)
          this.setToken(response.token)
          this.setRefreshToken(response.refreshToken)
          this.autoRefreshToken()
        }
      })
    );
  }

  autoRefreshToken() : void {
    const token = this.getToken();
    if(!token){
      return ;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now()-(60 * 1000);
    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);
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
    localStorage.removeItem(this.refreshtokenKey);
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login'])
  }

}
