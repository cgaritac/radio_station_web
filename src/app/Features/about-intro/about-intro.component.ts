import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { IconFeatureComponent } from '../../Shared/components/icon-feature/icon-feature.component';

@Component({
  selector: 'app-about-intro',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent, IconFeatureComponent],
  templateUrl: './about-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutIntroComponent {}
