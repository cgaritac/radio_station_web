import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YouTubeService } from '../../Core/services/youtube.service';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-youtube-channel',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    ActionButtonComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './youtube-channel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YouTubeChannelComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly youtubeService = inject(YouTubeService);
  private readonly radioService = inject(RadioService);

  private readonly uploadsPlaylistIdEnv = (import.meta as any).env
    .NG_APP_YOUTUBE_UPLOADS_PLAYLIST_ID;
  private readonly embedBaseUrlEnv = (import.meta as any).env.NG_APP_YOUTUBE_EMBED_URL;

  readonly subscribeUrl = computed(() => {
    const baseUrl = this.radioService.socialLinks.youtube;
    return baseUrl ? `${baseUrl}?sub_confirmation=1` : '#';
  });

  readonly subscriberCount = signal('YOUTUBE_CHANNEL.AMOUNT_SUBSCRIBERS');
  readonly lastVideoTitle = signal('YOUTUBE_CHANNEL.TITLE_FALLBACK');
  readonly lastVideoThumbnail = signal('images/community-microphone.jpg');
  readonly playlistId = signal(this.uploadsPlaylistIdEnv);

  readonly isLoading = signal(true);
  readonly showVideo = signal(false);
  readonly shouldAutoplay = signal(false);

  readonly videoEmbedUrl = computed<SafeResourceUrl>(() => {
    if (!this.embedBaseUrlEnv) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    const autoplay = this.shouldAutoplay() ? '1' : '0';
    const url = `${this.embedBaseUrlEnv}?listType=playlist&list=${this.playlistId()}&autoplay=${autoplay}&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  ngOnInit(): void {
    this.loadLatestVideo();
  }

  private async loadLatestVideo() {
    this.isLoading.set(true);

    try {
      if (!this.playlistId()) {
        throw new Error('Missing playlist ID');
      }

      const videoInfo = await this.youtubeService.getLatestVideo();
      if (videoInfo) {
        this.lastVideoTitle.set(videoInfo.title);
        this.lastVideoThumbnail.set(videoInfo.thumbnail);
      }
    } catch (error) {
      console.error('Failed to load latest YouTube video', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  playVideo(): void {
    this.shouldAutoplay.set(true);
    this.showVideo.set(true);
  }
}
