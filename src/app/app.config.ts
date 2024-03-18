// import {APP_INITIALIZER, ApplicationConfig, NgModule} from '@angular/core';
// import { provideRouter } from '@angular/router';
//
// import {routes} from './app.routes';
// import {KeycloakService} from "keycloak-angular";
// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'https://sso.carvia-test.org/',
//         realm: 'keycloakservice',
//         clientId: 'Finch'
//       },
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/assets/silent-check-sso.html'
//       },
//       loadUserProfileAtStartUp: true
//     });
// }
//
//
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes),
//     {
//       provide: APP_INITIALIZER,
//       useFactory: initializeKeycloak,
//       multi: true,
//       deps: [KeycloakService]
//     }
//   ]
// };





import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, withInterceptorsFromDi} from "@angular/common/http";
import {APP_INITIALIZER, Provider} from '@angular/core';

//
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
// }
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      // Configuration details for Keycloak
      config: {
        url: 'https://sso.carvia-test.org/',
        realm: 'keycloakservice',
        clientId: 'Finch'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true,
      // Enables Bearer interceptor
      enableBearerInterceptor: true,
      // Prefix for the Bearer token
      bearerPrefix: 'Bearer',
      // URLs excluded from Bearer token addition (empty by default)
      //bearerExcludedUrls: []
    });
}

// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient with interceptors
    KeycloakInitializerProvider, // Initializes Keycloak
    KeycloakBearerInterceptorProvider, // Provides Keycloak Bearer Interceptor
    KeycloakService, // Service for Keycloak
    provideRouter(routes,withViewTransitions(),withComponentInputBinding()),
    provideClientHydration(),
    // provideHttpClient(withFetch()),
    provideAnimations(),
    { provide: Document, useExisting: DOCUMENT },
    // TranslateModule.forRoot({
    //   defaultLanguage: 'ar',
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }).providers!
  ]
};





