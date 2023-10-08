import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../landing-page/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private serviceUser: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token =  this.serviceUser.Token;
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+token)
      });
    }
    
    
    
    return next.handle(request);

    
  }
}
