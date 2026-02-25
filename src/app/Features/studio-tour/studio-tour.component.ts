import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-studio-tour',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    SectionHeaderComponent,
    ActionButtonComponent,
  ],
  templateUrl: './studio-tour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioTourComponent {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly videoId = 'kWFIp12-Do0';

  readonly showVideo = signal(false);
  readonly shouldAutoplay = signal(false);

  readonly videoEmbedUrl = computed<SafeResourceUrl>(() => {
    const autoplay = this.shouldAutoplay() ? '1' : '0';
    const url = `https://www.youtube.com/embed/${this.videoId}?autoplay=${autoplay}&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  readonly thumbnailurl = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;

  playVideo(): void {
    this.shouldAutoplay.set(true);
    this.showVideo.set(true);
  }
}
