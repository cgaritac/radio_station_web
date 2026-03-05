import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '~/app/Shared/components/action-button/action-button.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent, SvgIconComponent, TranslateModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tooltip: string = '';

  // Styles
  @Input() backgroundColor: string = 'bg-brand-quaternary';
  @Input() textColor: string = 'text-brand-primary';
  @Input() iconColor: string = 'text-brand-primary';
  @Input() buttonColor: string = 'bg-brand-primary';
  @Input() buttonTextColor: string = 'text-brand-primary';
  @Input() width: string = 'w-full';
  @Input() height: string = 'h-full';
  
  // Primary button
  @Input() primaryText: string = '';
  @Input() primaryLink: string = '';
  @Input() primaryIcon: string = '';

  // Secondary button
  @Input() secondaryText: string = '';
  @Input() secondaryLink: string = '';
  @Input() secondaryIcon: string = '';

  // Decoration
  @Input() iconName: string = 'microphone';
}
