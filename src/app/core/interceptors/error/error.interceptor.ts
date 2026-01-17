import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface IMessage {
    message?: string;
    msg?: string;
}

function assertMessage(obj: any): obj is IMessage {
    return ("message" in obj) || ("msg" in obj);
}

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(
        catchError((err) => {
            const method = req.method;
            const status = err.status;
            const body = err.error;
            if (assertMessage(body)) {
                const message = body.message || body.msg;
                if (message) {
                    console.error("Htpp Request Error:", method, status, message);
                }
            }

            // DO NOT change the error and pass it forward
            return throwError(() => err);
        })
    );
};
