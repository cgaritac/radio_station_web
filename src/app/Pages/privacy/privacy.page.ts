import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent],
  templateUrl: './privacy.page.html',
  styleUrl: './privacy.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {}
