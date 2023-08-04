import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = () => {
  
  const loginService = inject(AuthService);
  const  router = inject(Router);
  
  if(loginService.isLoggedIn()  && loginService.getUserRole() == "ROLE_USER"){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
