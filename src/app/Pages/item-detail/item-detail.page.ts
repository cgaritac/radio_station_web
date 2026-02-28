import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  itemType = signal<string>('');
  itemId = signal<string>('');

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
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type') || this.route.snapshot.data['type'] || '';
      const id = params.get('id') || '';
      this.itemType.set(type);
      this.itemId.set(id);
      this.loadData(type, id);
    });
  }

  private loadData(type: string, id: string) {
    const section = type.toUpperCase() + '_PAGE';
    const baseKey = `${section}.ITEMS.ITEM_${id}`;

    // Get Title to check if exists
    const title = this.translate.instant(`${baseKey}.TITLE`);
    if (title === `${baseKey}.TITLE`) {
      // If we are in another language and haven't loaded it yet, instant might fail.
      // But usually it's loaded. Let's assume for now.
    }

    this.title.set(title);
    this.subtitle.set(this.translate.instant(`${section}.TAG`));
    this.content.set(this.translate.instant(`${baseKey}.CONTENT`));

    // Category
    const cat = this.translate.instant(`${baseKey}.CATEGORY`);
    this.category.set(cat !== `${baseKey}.CATEGORY` ? cat : '');

    // Date
    const d = this.translate.instant(`${baseKey}.DATE`);
    this.date.set(d !== `${baseKey}.DATE` ? d : '');

    // Series
    const s = this.translate.instant(`${baseKey}.SERIES`);
    this.series.set(s !== `${baseKey}.SERIES` ? s : '');

    // Author - we'll check if it exists in translation, otherwise use hardcoded if we had any
    const a = this.translate.instant(`${baseKey}.AUTHOR`);
    this.author.set(a !== `${baseKey}.AUTHOR` ? a : '');

    // Image logic - this is tricky because images were in the component signals
    // I'll need to mapping them or move them to JSON too.
    this.image.set(this.getImageFor(type, id));

    // If content is still the key, use excerpt as fallback or a placeholder
    if (this.content() === `${baseKey}.CONTENT`) {
      this.content().startsWith(`${baseKey}.CONTENT`) &&
        this.content().length === `${baseKey}.CONTENT`.length;
      this.content.set(this.translate.instant(`${baseKey}.EXCERPT`));
    }
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
