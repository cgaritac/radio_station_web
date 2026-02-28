import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeroComponent } from '../../Shared/components/page-hero/page-hero.component';
import { StudioTourComponent } from '../../Features/studio-tour/studio-tour.component';
import { TeamGridComponent } from '../../Features/team-grid/team-grid.component';
import { AboutIntroComponent } from '../../Features/about-intro/about-intro.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';
import { SeoService } from '../../Core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PageHeroComponent,
    StudioTourComponent,
    TeamGridComponent,
    AboutIntroComponent,
    AdvertiseBannerComponent,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.ABOUT_TITLE',
      descriptionKey: 'SEO.ABOUT_DESCRIPTION',
    });
  }
}
