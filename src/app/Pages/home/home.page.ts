import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HeroComponent } from '../../Features/hero/hero.component';
import { RadioService } from '../../Core/services/radio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BannerComponent } from '../../Shared/components/banner/banner.component';
import { BroadcastHistoryComponent } from '../../Features/broadcast-history/broadcast-history.component';
import { VerseComponent } from '../../Features/verse/verse.component';
import { CommunityComponent } from '../../Features/community/communitycomponent';
import { TestimonialsComponent } from '../../Features/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    TranslateModule,
    BannerComponent,
    BroadcastHistoryComponent,
    VerseComponent,
    CommunityComponent,
    TestimonialsComponent
  ],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly radioService = inject(RadioService);
  protected readonly translate = inject(TranslateService);
}