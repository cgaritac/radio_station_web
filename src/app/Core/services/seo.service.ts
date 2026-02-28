import { inject, Injectable, LOCALE_ID, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface SeoConfig {
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  image?: string;
  keywords?: string;
  type?: string;
  author?: string;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService implements OnDestroy {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private readonly env = (import.meta as any).env;

  private readonly siteName = this.env.NG_APP_SITE_NAME;
  private readonly defaultDescriptionKey = 'SEO.HOME_DESCRIPTION';
  private readonly baseUrl = this.env.NG_APP_BASE_URL;

  private lastConfig?: SeoConfig;
  private langChangeSub?: Subscription;

  constructor() {
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      if (this.lastConfig) {
        this.updateMetaTags(this.lastConfig);
      }
    });
  }

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }

  updateMetaTags(config: SeoConfig) {
    this.lastConfig = config;

    const title = config.titleKey ? this.translate.instant(config.titleKey) : config.title;
    const description = config.descriptionKey
      ? this.translate.instant(config.descriptionKey)
      : config.description || this.translate.instant(this.defaultDescriptionKey);

    const fullTitle = title
      ? `${title} | ${this.siteName}`
      : `${this.siteName} | ${this.translate.instant('SEO.DEFAULT_TITLE')}`;

    const image = config.image || `${this.baseUrl}/images/share-card.png`;
    const url = `${this.baseUrl}${this.router.url}`;

    // Standard Meta Tags
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    } else {
      this.meta.updateTag({ name: 'author', content: this.siteName });
    }

    // Robots
    if (config.noIndex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // Open Graph / Facebook
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({
      property: 'og:locale',
      content: this.translate.currentLang === 'es' ? 'es_ES' : 'en_US',
    });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonicalTag(url);
  }

  private updateCanonicalTag(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setStructuredData(data: any) {
    let script = document.getElementById('structured-data') as HTMLScriptElement | null;
    if (script) {
      script.textContent = JSON.stringify(data);
    } else {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }
}
