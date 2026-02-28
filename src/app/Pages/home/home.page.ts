import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { HeroComponent } from '../../Features/hero/hero.component';
import { RadioService } from '../../Core/services/radio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BroadcastHistoryComponent } from '../../Features/broadcast-history/broadcast-history.component';
import { VerseComponent } from '../../Features/verse/verse.component';
import { CommunityComponent } from '../../Features/community/communitycomponent';
import { YouTubeChannelComponent } from '../../Features/youtube-live/youtube-channel.component';
import { PrayerRequestComponent } from '../../Features/prayer-request/prayer-request.component';
import { SponsorsComponent } from '../../Features/sponsors/sponsors.component';
import { AdvertiseBannerComponent } from '../../Features/advertise-banner/advertise-banner.component';
import { SeoService } from '../../Core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    TranslateModule,
    AdvertiseBannerComponent,
    BroadcastHistoryComponent,
    VerseComponent,
    CommunityComponent,
    YouTubeChannelComponent,
    PrayerRequestComponent,
    SponsorsComponent,
  ],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  protected readonly radioService = inject(RadioService);
  protected readonly translate = inject(TranslateService);
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.HOME_TITLE',
      descriptionKey: 'SEO.HOME_DESCRIPTION',
    });
  }
}
