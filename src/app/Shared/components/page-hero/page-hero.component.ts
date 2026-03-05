import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent],
  templateUrl: './page-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeroComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) subtitle: string = '';
  @Input() size: 'medium' | 'large' = 'large';
}
