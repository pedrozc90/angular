import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";

import { environment } from "@environments/environment";
import { routes } from "./app.routes";
import { authInterceptor } from "./core/intercetors";
import { AuthStateService } from "./core/services";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideAppInitializer(() => {
			console.log(`Initializing App ${environment.name} ${environment.version}`);
			const auth = inject(AuthStateService);
			return auth.checkSession();
		}),
	],
};
