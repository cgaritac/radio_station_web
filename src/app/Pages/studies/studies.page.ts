import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';

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
    SvgIconComponent,
    AdvertiseBannerComponent,
    SectionHeaderComponent,
    RouterLink,
  ],
  templateUrl: './studies.page.html',
  styleUrl: './studies.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesPage {
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

  categories = signal<Category[]>([
    { slug: 'nuevo-testamento', label: 'STUDIES_PAGE.CATEGORIES.NEW_TESTAMENT' },
    { slug: 'vida-cristiana', label: 'STUDIES_PAGE.CATEGORIES.CHRISTIAN_LIFE' },
    { slug: 'teologia', label: 'STUDIES_PAGE.CATEGORIES.THEOLOGY' },
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
      categorySlug: 'nuevo-testamento',
    },
    {
      id: '2',
      title: 'STUDIES_PAGE.ITEMS.ITEM_2.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_2.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_2.EXCERPT',
      image: 'images/studies-vida.png',
      category: 'STUDIES_PAGE.CATEGORIES.CHRISTIAN_LIFE',
      categorySlug: 'vida-cristiana',
    },
    {
      id: '3',
      title: 'STUDIES_PAGE.ITEMS.ITEM_3.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_3.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_3.EXCERPT',
      image: 'images/studies-teologia.png',
      category: 'STUDIES_PAGE.CATEGORIES.THEOLOGY',
      categorySlug: 'teologia',
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
