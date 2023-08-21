import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService, jwtResponse } from '../services/auth.service';
import { Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';
import { ValidatorsService } from 'src/app/shared/validators.service';



export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);

  private refreshingToken: boolean = false;

  private validators = inject(ValidatorsService);

  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**  let authReq = req;
    const token = this.authService.getToken();
    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(authReq);
    */
    const token = this.authService.getToken();
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.refreshingToken) {
          this.refreshingToken = true;
          this.refreshTokenSubject.next(null);

          let refresh = this.authService.getRefreshToken();
          return this.authService.saveRefreshToken(refresh || '').pipe(
            switchMap((resp: jwtResponse) => {
              
              console.log(resp.accessToken);
              this.refreshingToken = false;

              this.authService.setToken(resp.accessToken);
              this.refreshTokenSubject.next(resp.accessToken);
              let auth = this.addToken(req, resp.accessToken);
              console.log('REFRESH' + auth);
              return next.handle(auth);
            }),
            catchError(() => {
              this.refreshingToken = false;
              return throwError(() =>  {
                this.authService.logout();
                this.validators.validateSnackBar('Please log in again!');
              });
            })
            );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
