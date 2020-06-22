import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentToken = this.authService.currentToken;
        if (currentToken && currentToken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken.token}`
                }
            });
        }
        return next.handle(request).pipe(tap(
            event => { },
            error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 401) {
                        console.log('Token expirado / inválido!');
                        console.log("Deslogando usuário...");
                        this.authService.logout();
                    }
                    return next.handle(request);
                }
            })
        );
    }
}
