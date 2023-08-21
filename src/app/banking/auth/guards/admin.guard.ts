import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.getUserRole() == 'ROLE_ADMIN') {
    return true;
   }
   router.navigate(['/login'])
  return false;
};
