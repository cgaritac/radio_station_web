import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HeroComponent } from '../../Features/hero/hero.component';
import { RadioService } from '../../Core/services/radio.service';
import { TranslateModule } from '@ngx-translate/core';
import { BannerComponent } from '../../Shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TranslateModule, BannerComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly radioService = inject(RadioService);
}
