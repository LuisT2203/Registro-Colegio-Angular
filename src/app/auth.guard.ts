import { CanActivateFn} from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';
import {  Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const type = authService.getUserType();
    if (type === 'admin') {
      // Si el usuario es empleado, permite el acceso
      return true;
    } else {
      // Si no es empleado, redirige a inicio o a otra ruta
      return router.navigate(['/inicio']);
    }
  } else {
    // Si no está autenticado, redirige al login
    return router.navigate(['/login']);
  }

};
