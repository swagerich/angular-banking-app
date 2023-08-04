import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../interfaces/loginDto-interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { Subscription, catchError, switchMap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private validator = inject(ValidatorsService);

  private subscription: Subscription = new Subscription();

  private route = inject(Router);

  public myFormLogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  get currentUserLoginDto(): LoginDto {
    return this.myFormLogin.value as LoginDto;
  }

  onLoginSave(): void {
    if (this.myFormLogin.invalid) {
      this.myFormLogin.markAllAsTouched();
      return;
    }
    this.subscription = this.authService.login(this.currentUserLoginDto).subscribe({
        next: (data) => {
          this.authService.setToken(data.accessToken);
          const helper = new JwtHelperService();
          const decodedTokenUser = helper.decodeToken(data.accessToken);
          console.log(decodedTokenUser);

          this.authService.setUser(decodedTokenUser);
          if (this.authService.getUserRole() === 'ROLE_ADMIN') {
            this.route.navigate(['/admin/dashboard']);
            this.authService.loginStatusSubject.next(true);
          } else if (this.authService.getUserRole() === 'ROLE_USER') {
            this.route.navigate(['/user/dashboard']);
            this.authService.loginStatusSubject.next(true);
          } else {
            this.authService.logout();
          }
        },
        error: (e: HttpErrorResponse) => {
          this.validator.showSnackBarForError(e);
        },
      });
  }
  onFielValidators(field: string): boolean | null {
    return this.validator.isValidField(this.myFormLogin, field);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
