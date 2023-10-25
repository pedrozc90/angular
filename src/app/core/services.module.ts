import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ErrorInterceptor, TokenInterceptor } from "./interceptors";
import {
    AuthenticationService,
    LocalStorageService,
    UsersService
} from "./services";

@NgModule({
    providers: [
        // services
        LocalStorageService,
        AuthenticationService,
        // backend services
        UsersService,
        // interceptors
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class ServicesModule { }
