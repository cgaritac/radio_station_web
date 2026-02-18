import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { IconRegistryService } from './Core/services/icon-registry.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

const getInitialLang = () => {
  if (typeof window !== 'undefined' && window.navigator) {
    const browserLang = window.navigator.language.split('-')[0];
    return ['en', 'es'].includes(browserLang) ? browserLang : 'es';
  }
  return 'es';
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAngularSvgIcon(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
      lang: getInitialLang(),
      fallbackLang: 'es',
    }),
    provideAppInitializer(() => {
      const iconService = inject(IconRegistryService);
      return iconService.preloadIcons();
    })
  ]
};
