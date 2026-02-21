import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent],
  templateUrl: './terms.page.html',
  styleUrl: './terms.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPage {}
