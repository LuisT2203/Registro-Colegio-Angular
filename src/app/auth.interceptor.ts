import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const token = authService.getToken(); // Obtiene el token del servicio

  // Si existe un token, clonamos la solicitud y agregamos el token en la cabecera
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }

  // Si no hay token, simplemente pasamos la solicitud original
  return next(req);
};
