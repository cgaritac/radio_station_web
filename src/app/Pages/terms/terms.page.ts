import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { SeoService } from '../../Core/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent],
  templateUrl: './terms.page.html',
  styleUrl: './terms.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPage implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.TERMS_TITLE',
      descriptionKey: 'SEO.TERMS_DESCRIPTION',
    });
  }
}
