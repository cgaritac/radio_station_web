import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

export interface Program {
  title: string;
  time: string;
}

@Component({
  selector: 'app-schedule-program-item',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent],
  host: { class: 'block' },
  template: `
    <div
      class="bg-brand-tertiary/10 backdrop-blur-xl rounded-[32px] p-8 border border-brand-tertiary/10 group hover:bg-brand-tertiary transition-all duration-500 hover:translate-x-2"
    >
      <div class="flex flex-col gap-3">
        <h3
          class="text-xl font-black text-brand-tertiary group-hover:text-brand-primary transition-colors leading-tight"
        >
          {{ program().title | translate }}
        </h3>
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-brand-tertiary/10 flex items-center justify-center group-hover:bg-brand-primary/5"
          >
            <svg-icon
              name="clock"
              class="w-4 h-4 text-brand-tertiary group-hover:text-brand-secondary"
            ></svg-icon>
          </div>
          <span
            class="text-sm font-black text-brand-tertiary/50 group-hover:text-brand-primary/40 uppercase tracking-[0.2em]"
          >
            {{ program().time }}
          </span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleProgramItemComponent {
  program = input.required<Program>();
}
