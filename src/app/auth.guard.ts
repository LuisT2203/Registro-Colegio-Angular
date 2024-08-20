import { CanActivateFn} from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';
import {  Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si el usuario está autenticado, permite el acceso
    return true;
  } else {
    // Si no está autenticado, redirige al login
    return  router.navigate(['/login']);

  }

};
