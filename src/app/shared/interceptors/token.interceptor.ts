import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token') || localStorage.getItem('token') || ''
    console.log(token);


    if(req.params.get('googleapis')) {
      req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${this.cookieService.get('gmail_access_token')}`,
            Accept: 'application/json'
        }
      })
    } else if(req.params.get('outlookapis')) {
      req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${this.cookieService.get('outlook_access_token')}`,
            Accept: 'application/json'
        }
      })
    } else {
      req = req.clone({
        setHeaders: {
            Authorization: token,
            Accept: 'application/json'
        }
      })
    }

    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(
          error,
          !!req.params.get('googleapis') || !!req.params.get('outlookapis')
        )
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse, isNotAuth: boolean): Observable<any> {
    if(error.status === 401) {
      if(!isNotAuth) {
        this.router.navigate(['/login'], {
          queryParams: {
              sessionFailed: true
          }
        })

        localStorage.clear()
        this.cookieService.deleteAll()
      }
    }

    return throwError(error)
  }
}

export const TokenInterceptorImport = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
}
