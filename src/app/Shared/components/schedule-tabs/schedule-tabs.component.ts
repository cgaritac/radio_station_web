import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface WeekTab {
  id: string;
  label: string;
  color: 'green' | 'blue';
}

@Component({
  selector: 'app-schedule-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="flex flex-wrap justify-center gap-4 mb-20">
      @for (week of weeks(); track week.id) {
        <button
          (click)="tabChange.emit(week.id)"
          [class]="
            activeId() === week.id
              ? (week.color === 'green'
                  ? 'bg-brand-quaternary text-white shadow-brand-quaternary/20'
                  : 'bg-brand-primary text-white shadow-brand-primary/20') + ' shadow-2xl scale-105'
              : 'bg-brand-tertiary text-brand-primary/40 hover:text-brand-primary hover:border-brand-secondary/30 hover:shadow-xl border border-brand-primary/5'
          "
          class="px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500 min-w-[140px] cursor-pointer focus:outline-none"
        >
          {{ week.label | translate }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTabsComponent {
  weeks = input.required<WeekTab[]>();
  activeId = input.required<string>();
  tabChange = output<string>();
}
