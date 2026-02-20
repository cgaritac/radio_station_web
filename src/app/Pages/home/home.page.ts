import { Component, ChangeDetectionStrategy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroComponent } from '../../Features/hero/hero.component';
import { RadioService } from '../../Core/services/radio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BannerComponent } from '../../Shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TranslateModule, BannerComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  protected readonly radioService = inject(RadioService);
  protected readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  verseData: any;

  ngOnInit() {
    this.loadVerse();
    this.translate.onLangChange.subscribe(() => {
      this.loadVerse();
    });
  }

  private loadVerse() {
    const lang = this.translate.currentLang || 'es';
    const version = lang === 'es' ? 'rvr1960' : 'NIV';
    const url = `https://www.biblegateway.com/votd/get/?format=json&version=${version}`;

    this.http.jsonp(url, 'callback').subscribe({
      next: (data: any) => {
        this.verseData = data.votd;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching verse:', err);
      }
    });
  }
}