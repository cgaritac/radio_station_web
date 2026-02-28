import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-branding',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div
      class="absolute top-12 right-12 hidden lg:flex flex-col items-end pointer-events-none opacity-20"
    >
      <span class="text-2xl font-black text-brand-tertiary uppercase italic tracking-widest">{{
        radioName()
      }}</span>
      <span class="text-6xl font-black text-brand-tertiary uppercase italic leading-none">{{
        'RADIO_SLOGAN' | translate
      }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleBrandingComponent {
  radioName = input.required<string>();
}
