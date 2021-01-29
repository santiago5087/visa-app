import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    let authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(authReq)
      .pipe(tap((event: HttpEvent<any>) => {
        // do nothing
      },
      err => {
        if(err.status === 401 && token) {
          console.log('Unauthorized Interceptor: ', err);
          this.authService.checkJWT();
        }
      }));
  }
}
