import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BannerComponent } from '../../Shared/components/banner/banner.component';

@Component({
  selector: 'app-advertise-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule, BannerComponent],
  template: `
    <section
      id="advertise-banner"
      class="flex flex-col items-center justify-center w-full bg-brand-tertiary/95 px-4 py-8"
    >
      <app-banner
        [title]="'BANNER.ADVERTISE_TITLE' | translate"
        [description]="'BANNER.ADVERTISE_SUBTITLE' | translate"
        [primaryText]="'BANNER.CONTACT_NOW' | translate"
        [tooltip]="'BANNER.ADVERTISE_TOOLTIP' | translate"
        primaryLink="/contact"
        primaryIcon="mail"
        [secondaryText]="'BANNER.DOWNLOAD_PRICES' | translate"
        [secondaryLink]="brochureLink"
        secondaryIcon="info"
        iconName="speaker"
        backgroundColor="bg-brand-quaternary"
        textColor="text-brand-primary"
        iconColor="text-brand-primary/30"
        buttonColor="bg-brand-primary"
        buttonTextColor="text-brand-primary"
        width="max-w-desktop mx-auto"
        height="h-full"
      ></app-banner>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseBannerComponent {
  readonly brochureLink = (import.meta as any).env.NG_APP_ADVERTISE_BROCHURE_URL;
}
