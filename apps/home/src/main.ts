import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare global {
  interface Window {
    _stlmppDestroySvelteApp?(): void;
    _stlmppCreateSvelteApp?(): void;
    _stlmppDestroyReactApp?(): void;
    _stlmppCreateReactApp?(): void;
  }
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
