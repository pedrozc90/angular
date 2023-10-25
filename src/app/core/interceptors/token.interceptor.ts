import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { AuthenticationService } from "../services";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const isApiUrl = request.url.includes(environment.api);
        if (isApiUrl) {
            const access_token = this.auth.access_token;
            if (access_token) {
                request = request.clone({ setHeaders: { "Authorization": `Bearer ${access_token}` } });
            }
        }
        return next.handle(request);
    }
}
