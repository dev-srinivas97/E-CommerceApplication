import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { envUrl } from '../environments/environment';
import { authInterceptorProviders, AuthInterceptorService } from './Services/auth-interceptor.service';
import { HomeComponent } from './home-component/home-component.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    LoginComponent,
    LoginService,
    HomeComponent,
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideRouter(routes),
    authInterceptorProviders,
    HttpClientModule,
    provideServerRendering(),
    importProvidersFrom(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
