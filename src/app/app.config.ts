import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { IconRegistryService } from './Core/services/icon-registry.service';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

const getInitialLang = () => {
  if (typeof window !== 'undefined') {
    // 1. Check LocalStorage
    const savedLang = localStorage.getItem('user_lang');
    if (savedLang && ['en', 'es'].includes(savedLang)) {
      return savedLang;
    }

    // 2. Check Browser Language
    if (window.navigator) {
      const browserLang = window.navigator.language.split('-')[0];
      return ['en', 'es'].includes(browserLang) ? browserLang : 'es';
    }
  }
  return 'es';
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withJsonpSupport()),
    provideAngularSvgIcon(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
      lang: getInitialLang(),
      fallbackLang: 'es',
    }),
    provideAppInitializer(() => {
      const iconService = inject(IconRegistryService);
      const translate = inject(TranslateService);
      const initialLang = getInitialLang();

      return Promise.all([
        iconService.preloadIcons(),
        new Promise((resolve) => {
          translate.use(initialLang).subscribe({
            next: () => resolve(true),
            error: () => resolve(false),
          });
        }),
      ]);
    }),
  ],
};
