import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';
import { RadioService } from '~/app/Core/services/radio.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, SectionHeaderComponent],
  templateUrl: './contact-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {
  protected readonly radioService = inject(RadioService);
}
