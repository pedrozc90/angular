import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";
import { IPage } from "../../types";

export class HttpService<T> {

    protected url: string;

    constructor(
        protected http: HttpClient,
        protected endpoint: string
    ) {
        const host = (environment.api).replaceAll(/\/+$/g, "");
        const path = endpoint.replaceAll(/^\/+/g, "");
        this.url = `${host}/${path}`;
    }

    public get(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}/${id}`);
    }

    public fetch(opts: unknown): Observable<IPage<T>> {
        const params = this.createHttpParams(opts);
        return this.http.get<IPage<T>>(this.url, { params });
    }

    public save(data: unknown): Observable<unknown> {
        return this.http.post<unknown>(this.url, data);
    }

    protected createHttpParams(params: any = {}): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        Object.entries(params).forEach(([key, value]) => {
            // ignore empty values
            if (typeof value === "undefined" || value === null) return;

            // number
            if (typeof value === "number") {
                httpParams = httpParams.set(key, value);
            }
            // boolean
            else if (typeof value === "boolean") {
                httpParams = httpParams.set(key, value);
            }
            // add string it's not a blank one
            else if (typeof value === "string") {
                const trimed = value.trim();
                if (trimed.length) {
                    httpParams = httpParams.set(key, trimed);
                }
            }
            // function
            else if (typeof value === "function") {
                console.error("Function:", key, value);
            }
            // "object"
            else if (typeof value === "object") {
                if (Array.isArray(value)) {
                    if (value.length) {
                        // append array like "/route?x=1&x=2&x=3"
                        if (value.every((row) => typeof row === "number")) {
                            for (let row of value) {
                                httpParams = httpParams.append(key, row);
                            }
                        }
                        // append array like "/route?x=1,2,3"
                        else {
                            httpParams = httpParams.set(key, value.join(","));
                        }
                    }
                } else if (Object.keys(value).length) {
                    httpParams = httpParams.set(key, JSON.stringify(value));
                }
            } else {
                console.error(key, value, typeof value);
            }
        });
        return httpParams;
    }

}
