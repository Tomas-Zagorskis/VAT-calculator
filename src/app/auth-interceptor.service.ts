import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === 'https://api.vatstack.com/v1/rates') {
      const modifiedRequest = req.clone({
        headers: req.headers.append('X-API-KEY', environment.API_KEY),
        params: req.params.append('limit', '100'),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
