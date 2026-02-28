import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';
import { CategoryFilterComponent } from '../../Shared/components/category-filter/category-filter.component';
import { NewsGridComponent } from '../../Features/news-grid/news-grid.component';
import { SeoService } from '../../Core/services/seo.service';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  categorySlug: string;
}

interface Category {
  slug: string;
  label: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AdvertiseBannerComponent,
    SectionHeaderComponent,
    CategoryFilterComponent,
    NewsGridComponent,
  ],
  templateUrl: './news.page.html',
  styleUrl: './news.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.NEWS_TITLE',
      descriptionKey: 'SEO.NEWS_DESCRIPTION',
    });
  }

  categories = signal<Category[]>([
    { slug: 'radio', label: 'NEWS_PAGE.CATEGORIES.RADIO' },
    { slug: 'community', label: 'NEWS_PAGE.CATEGORIES.COMMUNITY' },
    { slug: 'events', label: 'NEWS_PAGE.CATEGORIES.EVENTS' },
  ]);

  selectedCategorySlug = toSignal(
    this.route.params.pipe(map((params) => params['category'] || 'all')),
  );

  heroTitle = computed(() => {
    const categorySlug = this.selectedCategorySlug();
    if (!categorySlug || categorySlug === 'all') {
      return this.translate.instant('NEWS_PAGE.TITLE');
    }
    const category = this.categories().find((c) => c.slug === categorySlug);
    return category
      ? this.translate.instant('NEWS_PAGE.TITLE') + ': ' + this.translate.instant(category.label)
      : this.translate.instant('NEWS_PAGE.TITLE');
  });

  newsItems = signal<NewsItem[]>([
    {
      id: '1',
      title: 'NEWS_PAGE.ITEMS.ITEM_1.TITLE',
      date: 'NEWS_PAGE.ITEMS.ITEM_1.DATE',
      excerpt: 'NEWS_PAGE.ITEMS.ITEM_1.EXCERPT',
      image: 'images/news-radio.png',
      category: 'NEWS_PAGE.CATEGORIES.RADIO',
      categorySlug: 'radio',
    },
    {
      id: '2',
      title: 'NEWS_PAGE.ITEMS.ITEM_2.TITLE',
      date: 'NEWS_PAGE.ITEMS.ITEM_2.DATE',
      excerpt: 'NEWS_PAGE.ITEMS.ITEM_2.EXCERPT',
      image: 'images/news-community.png',
      category: 'NEWS_PAGE.CATEGORIES.COMMUNITY',
      categorySlug: 'community',
    },
    {
      id: '3',
      title: 'NEWS_PAGE.ITEMS.ITEM_3.TITLE',
      date: 'NEWS_PAGE.ITEMS.ITEM_3.DATE',
      excerpt: 'NEWS_PAGE.ITEMS.ITEM_3.EXCERPT',
      image: 'images/news-events.png',
      category: 'NEWS_PAGE.CATEGORIES.EVENTS',
      categorySlug: 'events',
    },
  ]);

  filteredNews = computed(() => {
    const category = this.selectedCategorySlug();
    if (!category || category === 'all') {
      return this.newsItems();
    }
    return this.newsItems().filter((item) => item.categorySlug === category);
  });
}
