import {APP_INITIALIZER, ApplicationConfig, NgModule} from '@angular/core';
import { provideRouter } from '@angular/router';

import {AppRoutingModule, routes} from './app.routes';
import {AuthGuard} from "./keycloak.guard";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./component/home/home.component";
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://sso.carvia-test.org/',
        realm: 'keycloakservice',
        clientId: 'Finch'
      },
      // initOptions: {
      //   onLoad: 'check-sso',
      //   silentCheckSsoRedirectUri:
      //     window.location.origin + '/assets/silent-check-sso.html'
      // },
      loadUserProfileAtStartUp: true
    });
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};





