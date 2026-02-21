import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-youtube-live',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, ActionButtonComponent],
  templateUrl: './youtube-live.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YouTubeLiveComponent {
  readonly youtubeUrl = signal('https://www.youtube.com/@radioornannandayure');
  readonly subscriberCount = signal('12.5k');
  readonly lastVideoTitle = signal('Resumen de la Gran Cruzada Evangelística 2024');
  readonly lastVideoThumbnail = signal('images/community-microphone.jpg');
}
