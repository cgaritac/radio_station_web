import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';
import { SeoService } from '~/app/Core/services/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent],
  templateUrl: './privacy.page.html',
  styleUrl: './privacy.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.PRIVACY_TITLE',
      descriptionKey: 'SEO.PRIVACY_DESCRIPTION',
    });
  }
}
