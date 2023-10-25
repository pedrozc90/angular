import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            map((response) => {
                if (request.method === "POST" || request.method === "PUT") {
                    if (response instanceof HttpResponse && response.status === 200) {
                        const message = (response.body as any)?.message || null;
                        if (message) {
                            console.error(message);
                        }
                    }
                }
                return response;
            }),
            catchError((err, caught) => {
                if (!err.ok) {
                    const message = err.error?.msg || err.message || null;
                    if (message) {
                        console.error(message);
                    }
                }
                return of(err);
            })
        );
    }

}
