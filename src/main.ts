import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

gapi.client.load('drive', 'v3', bootstrapApplication);

function bootstrapApplication() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}