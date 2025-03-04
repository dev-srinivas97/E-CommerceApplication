import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorage.getTempToken();
    console.log('Token from cache: ', token);
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('authorization', 'Bearer ' + token),
      });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: AuthInterceptorService, useClass: AuthInterceptorService },
];
