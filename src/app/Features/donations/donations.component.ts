import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent, SvgIconComponent],
  templateUrl: './donations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationsComponent {}
