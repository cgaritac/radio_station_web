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

  private readonly videoId = (import.meta as any).env.NG_APP_STUDIO_TOUR_VIDEO_ID;
  private readonly youtubeEmbedBase = (import.meta as any).env.NG_APP_YOUTUBE_EMBED_URL;
  private readonly youtubeThumbnailBase = (import.meta as any).env.NG_APP_YOUTUBE_THUMBNAIL_URL;
  private readonly youtubeWatchBase = (import.meta as any).env.NG_APP_YOUTUBE_WATCH_URL;

  readonly showVideo = signal(false);
  readonly shouldAutoplay = signal(false);

  readonly videoEmbedUrl = computed<SafeResourceUrl>(() => {
    const autoplay = this.shouldAutoplay() ? '1' : '0';
    const url = `${this.youtubeEmbedBase}/${this.videoId}?autoplay=${autoplay}&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  readonly thumbnailurl = `${this.youtubeThumbnailBase}/${this.videoId}/maxresdefault.jpg`;

  readonly watchUrl = `${this.youtubeWatchBase}${this.videoId}`;

  playVideo(): void {
    this.shouldAutoplay.set(true);
    this.showVideo.set(true);
  }
}
