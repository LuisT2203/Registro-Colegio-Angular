import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated()) {
    const userType = authService.getUserType();
    if (userType === 'user') {
      // Si el usuario es user, permite el acceso
      return true;
    } else {
      return true;
    }
  } else {
    // Si no está autenticado, redirige al login
    return router.navigate(['/login']);
  }
};
