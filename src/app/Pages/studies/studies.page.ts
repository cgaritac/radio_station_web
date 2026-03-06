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
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';
import { AdvertiseBannerComponent } from '~/app/Features/advertise-banner/advertise-banner.component';
import { CategoryFilterComponent } from '~/app/Shared/components/category-filter/category-filter.component';
import { StudiesListComponent } from '~/app/Features/studies-list/studies-list.component';
import { SeoService } from '~/app/Core/services/seo.service';

interface StudyItem {
  id: string;
  title: string;
  series: string;
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
  selector: 'app-studies',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AdvertiseBannerComponent,
    SectionHeaderComponent,
    CategoryFilterComponent,
    StudiesListComponent,
  ],
  templateUrl: './studies.page.html',
  styleUrl: './studies.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesPage implements OnInit {
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.STUDIES_TITLE',
      descriptionKey: 'SEO.STUDIES_DESCRIPTION',
    });
  }

  categories = signal<Category[]>([
    { slug: 'new-testament', label: 'STUDIES_PAGE.CATEGORIES.NEW_TESTAMENT' },
    { slug: 'christian-life', label: 'STUDIES_PAGE.CATEGORIES.CHRISTIAN_LIFE' },
    { slug: 'theology', label: 'STUDIES_PAGE.CATEGORIES.THEOLOGY' },
  ]);

  selectedCategorySlug = toSignal(
    this.route.params.pipe(map((params) => params['category'] || 'all')),
  );

  heroTitle = computed(() => {
    const categorySlug = this.selectedCategorySlug();
    if (!categorySlug || categorySlug === 'all') {
      return this.translate.instant('STUDIES_PAGE.TITLE');
    }
    const category = this.categories().find((c) => c.slug === categorySlug);
    return category
      ? this.translate.instant('STUDIES_PAGE.TITLE') + ': ' + this.translate.instant(category.label)
      : this.translate.instant('STUDIES_PAGE.TITLE');
  });

  studies = signal<StudyItem[]>([
    {
      id: '1',
      title: 'STUDIES_PAGE.ITEMS.ITEM_1.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_1.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_1.EXCERPT',
      image: 'images/studies-new-testament.png',
      category: 'STUDIES_PAGE.CATEGORIES.NEW_TESTAMENT',
      categorySlug: 'new-testament',
    },
    {
      id: '2',
      title: 'STUDIES_PAGE.ITEMS.ITEM_2.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_2.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_2.EXCERPT',
      image: 'images/studies-vida.png',
      category: 'STUDIES_PAGE.CATEGORIES.CHRISTIAN_LIFE',
      categorySlug: 'christian-life',
    },
    {
      id: '3',
      title: 'STUDIES_PAGE.ITEMS.ITEM_3.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_3.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_3.EXCERPT',
      image: 'images/studies-teologia.png',
      category: 'STUDIES_PAGE.CATEGORIES.THEOLOGY',
      categorySlug: 'theology',
    },
  ]);

  filteredStudies = computed(() => {
    const category = this.selectedCategorySlug();
    if (!category || category === 'all') {
      return this.studies();
    }
    return this.studies().filter((study) => study.categorySlug === category);
  });
}
