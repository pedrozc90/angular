import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

export class BaseService<T> {

    protected url: string;

    constructor(protected http: HttpClient, private endpoint: string = "") {
        this.url = `${environment.api}${endpoint}`;
    }

    public list(page: number = 1, rpp: number = 15, opts: unknown): Observable<T[]> {
        const params: any = { page, rpp };
        return this.http.get<T[]>(this.url, { params });
    }

    public save(data: unknown): Observable<T> {
        return this.http.post<T>(this.url, data);
    }

    public get(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}/${id}`);
    }

    public update(id: number, data: unknown): Observable<T> {
        return this.http.put<T>(`${this.url}/${id}`, data);
    }

    public delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${id}`);
    }

}
