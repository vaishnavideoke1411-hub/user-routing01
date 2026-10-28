import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    

    this._spinner.show()

    const authRequest = request.clone({
      setHeaders: {
        Authorization: request.headers.get('Authorization') ?? 'Bearer sample-token'
      }
    });

    return next.handle(authRequest).pipe(

      finalize(() => this._spinner.hide())
    );
  }
}