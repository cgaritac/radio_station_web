import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { BannerComponent } from '../../Shared/components/banner/banner.component';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import {
  DetailModalComponent,
  ModalDetail,
} from '../../Shared/components/detail-modal/detail-modal.component';

interface StudyItem {
  id: string;
  title: string;
  series: string;
  excerpt: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    BannerComponent,
    SectionHeaderComponent,
    DetailModalComponent,
  ],
  templateUrl: './studies.page.html',
  styleUrl: './studies.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesPage {
  private translate = inject(TranslateService);
  studies = signal<StudyItem[]>([
    {
      id: '1',
      title: 'STUDIES_PAGE.ITEMS.ITEM_1.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_1.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_1.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1504052434467-813d1ef3933c?w=800&auto=format&fit=crop',
      category: 'Nuevo Testamento',
    },
    {
      id: '2',
      title: 'STUDIES_PAGE.ITEMS.ITEM_2.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_2.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_2.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
      category: 'Vida Cristiana',
    },
    {
      id: '3',
      title: 'STUDIES_PAGE.ITEMS.ITEM_3.TITLE',
      series: 'STUDIES_PAGE.ITEMS.ITEM_3.SERIES',
      excerpt: 'STUDIES_PAGE.ITEMS.ITEM_3.EXCERPT',
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
      category: 'Teología',
    },
  ]);

  selectedItem = signal<StudyItem | null>(null);

  openItem(item: StudyItem) {
    this.selectedItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedItem.set(null);
    document.body.style.overflow = 'auto';
  }

  getModalDetails(item: StudyItem): ModalDetail[] {
    return [
      { icon: 'radio', text: item.series },
      { icon: 'info', text: item.category },
    ];
  }
}
