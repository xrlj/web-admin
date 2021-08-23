import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TrimNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>>>>>TrimNameInterceptor');
    console.log(req.body);
    const body = req.body;
    if (!body || !body.userName ) {
      return next.handle(req);
    }
    // copy the body and trim whitespace from the userName property
    const newBody = { ...body, userName: body.userName.trim() };
    // clone request and set its body
    const newReq = req.clone({ body: newBody });
    // send the cloned request to the next handler.
    return next.handle(newReq);
  }
}
