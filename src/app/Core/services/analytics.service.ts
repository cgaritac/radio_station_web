import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare var gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private router = inject(Router);
  private readonly gaId = (import.meta as any).env.NG_APP_GA_ID;

  constructor() {}

  init() {
    if (typeof gtag === 'undefined' || !this.gaId) {
      console.warn('Google Analytics (gtag) is not initialized or GA ID is missing.');
      return;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', this.gaId, {
          page_path: event.urlAfterRedirects,
        });
      });
  }

  trackEvent(eventName: string, eventParams: any = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
    }
  }
}
