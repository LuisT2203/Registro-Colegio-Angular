import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getIsLoggedIn()) {
    // Si el usuario está autenticado, permite el acceso
    return true;
  } else {
    // Si no está autenticado, redirige al login
    router.navigate(['/login']);
    return false;
  }

};
