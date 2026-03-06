import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleService } from '~/app/Core/services/bible.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';

@Component({
  selector: 'app-verse',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, SectionHeaderComponent],
  templateUrl: './verse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerseComponent implements OnInit {
  protected readonly bibleService = inject(BibleService);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly verseData = signal<any>(null);

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
        this.verseData.set(votd);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching verse:', err);
      },
    });
  }
}
