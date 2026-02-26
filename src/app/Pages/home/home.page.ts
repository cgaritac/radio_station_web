import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
    SponsorsComponent
  ],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly radioService = inject(RadioService);
  protected readonly translate = inject(TranslateService);
}