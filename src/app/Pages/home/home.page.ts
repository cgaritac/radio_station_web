import { Component, ChangeDetectionStrategy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeroComponent } from '../../Features/hero/hero.component';
import { RadioService } from '../../Core/services/radio.service';
import { BibleService } from '../../Core/services/bible.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BannerComponent } from '../../Shared/components/banner/banner.component';
import { ScheduleComponent } from '../../Features/schedule/schedule.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TranslateModule, BannerComponent, ScheduleComponent, SvgIconComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  protected readonly radioService = inject(RadioService);
  protected readonly translate = inject(TranslateService);
  private readonly bibleService = inject(BibleService);
  private readonly cdr = inject(ChangeDetectorRef);

  verseData: any;

  ngOnInit() {
    this.loadVerse();
    this.translate.onLangChange.subscribe(() => {
      this.loadVerse();
    });
  }

  private loadVerse() {
    const lang = this.translate.getCurrentLang();
    const version = lang === 'es' ? 'rvr1960' : 'NIV';

    this.bibleService.getVerse(version).subscribe({
      next: (votd) => {
        this.verseData = votd;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching verse:', err);
      }
    });
  }
}