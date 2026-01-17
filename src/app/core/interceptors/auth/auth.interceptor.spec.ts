import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";

import { authInterceptor } from "./auth.interceptor";

describe("authInterceptor", () => {
    let mock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(
                    withInterceptors([authInterceptor])
                ),
                provideHttpClientTesting()
            ]
        });

        mock = TestBed.inject(HttpTestingController);
    });

    it("should be created", () => {
        const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => authInterceptor(req, next));
        expect(interceptor).toBeTruthy();
    });

    it("should add authtentication to the request", () => {
        const http = TestBed.inject(HttpClient);
        const result = http.get("/test").subscribe();
        const req = mock.expectOne("/test");
        expect(req.request.withCredentials).toBe(true);
        req.flush({});
    });
});
