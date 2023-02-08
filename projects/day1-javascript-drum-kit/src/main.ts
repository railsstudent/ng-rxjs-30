import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { AppComponent } from './app/app.component';
import { WINDOW_PROVIDERS } from './app/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
    ...WINDOW_PROVIDERS,
  ]
})
  .catch(err => console.error(err));