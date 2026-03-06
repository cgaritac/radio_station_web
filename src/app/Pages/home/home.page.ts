import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { HeroComponent } from '~/app/Features/hero/hero.component';
import { RadioService } from '~/app/Core/services/radio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BroadcastHistoryComponent } from '~/app/Features/broadcast-history/broadcast-history.component';
import { VerseComponent } from '~/app/Features/verse/verse.component';
import { CommunityComponent } from '~/app/Features/community/communitycomponent';
import { YouTubeChannelComponent } from '~/app/Features/youtube-live/youtube-channel.component';
import { PrayerRequestComponent } from '~/app/Features/prayer-request/prayer-request.component';
import { SponsorsComponent } from '~/app/Features/sponsors/sponsors.component';
import { AdvertiseBannerComponent } from '~/app/Features/advertise-banner/advertise-banner.component';
import { DonationsComponent } from '~/app/Features/donations/donations.component';
import { SeoService } from '~/app/Core/services/seo.service';

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
    DonationsComponent,
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
