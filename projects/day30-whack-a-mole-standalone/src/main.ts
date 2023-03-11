
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ]
}).catch(err => console.error(err));
