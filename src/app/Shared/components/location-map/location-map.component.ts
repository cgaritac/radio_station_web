import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RadioService } from '../../../Core/services/radio.service';

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './location-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationMapComponent implements OnInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly translateService = inject(TranslateService);
  private readonly radioService = inject(RadioService);

  private langSub?: Subscription;

  readonly mapUrl = signal<SafeResourceUrl>(this.sanitizer.bypassSecurityTrustResourceUrl(''));

  ngOnInit() {
    this.updateMapUrl();
    this.langSub = this.translateService.onLangChange.subscribe(() => {
      this.updateMapUrl();
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  private updateMapUrl() {
    const address = this.radioService.radioAddress();
    const baseUrl = this.radioService.socialLinks.googleMapsEmbed;
    const url = `${baseUrl}${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    this.mapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
