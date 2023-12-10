import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class CatchErorrInterceptor implements HttpInterceptor {

  constructor(private tostar:ToastrService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
      this.tostar.error(error.error.message);
      if(error.error.message === 'jwt expired'){
        this.router.navigate(['/auth/login'])

      }

       throw error.error.message

    }))
  }
}
