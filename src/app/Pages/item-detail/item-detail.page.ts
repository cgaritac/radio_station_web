import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { RadioService } from '../../Core/services/radio.service';
import { SeoService } from '../../Core/services/seo.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    SectionHeaderComponent,
    ActionButtonComponent,
    RouterLink,
  ],
  templateUrl: './item-detail.page.html',
  styleUrl: './item-detail.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailPage implements OnInit {
  radioService = inject(RadioService);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private seoService = inject(SeoService);

  itemType = signal<string>('');
  itemId = signal<string>('');
  imageLoaded = signal<boolean>(false);

  // Data
  title = signal<string>('');
  subtitle = signal<string>('');
  content = signal<string>('');
  image = signal<string>('');
  date = signal<string>('');
  author = signal<string>('');
  category = signal<string>('');
  series = signal<string>('');

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const type = params.get('type') || this.route.snapshot.data['type'] || '';
      const id = params.get('id') || '';
      this.itemType.set(type);
      this.itemId.set(id);
      this.loadData(type, id);
    });

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loadData(this.itemType(), this.itemId());
    });
  }

  private loadData(type: string, id: string) {
    if (!type || !id) return;
    this.imageLoaded.set(false);
    const section = type.toUpperCase() + '_PAGE';
    const baseKey = `${section}.ITEMS.ITEM_${id}`;

    // Set translation keys instead of instant translations for reactivity
    this.title.set(`${baseKey}.TITLE`);
    this.subtitle.set(`${section}.TAG`);
    this.content.set(`${baseKey}.CONTENT`);

    // Helper to only set the key if the translation exists
    const getOptionalKey = (key: string) => {
      const translation = this.translate.instant(key);
      return translation !== key ? key : '';
    };

    // For metadata, the key is set if it exists in the translation file
    this.category.set(getOptionalKey(`${baseKey}.CATEGORY`));
    this.date.set(getOptionalKey(`${baseKey}.DATE`));
    this.series.set(getOptionalKey(`${baseKey}.SERIES`));
    this.author.set(getOptionalKey(`${baseKey}.AUTHOR`));

    this.image.set(this.getImageFor(type, id));

    // Update SEO
    this.translate.get([this.title(), this.content()]).subscribe((translations) => {
      this.seoService.updateMetaTags({
        title: translations[this.title()],
        description: translations[this.content()].substring(0, 160) + '...',
        image: this.image(),
        type: 'article',
      });
    });
  }

  private getImageFor(type: string, id: string): string {
    const images: Record<string, Record<string, string>> = {
      blog: {
        '1': 'images/blog-prayer.png',
        '2': 'images/blog-community.png',
        '3': 'images/blog-music.png',
      },
      news: {
        '1': 'images/news-radio.png',
        '2': 'images/news-community.png',
        '3': 'images/news-events.png',
      },
      studies: {
        '1': 'images/studies-new-testament.png',
        '2': 'images/studies-vida.png',
        '3': 'images/studies-teologia.png',
      },
    };
    return images[type]?.[id] || '';
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
