import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  ScheduleProgramItemComponent,
  Program,
} from '../schedule-program-item/schedule-program-item.component';

export interface DaySchedule {
  dayName: string;
  dayNumber: number;
  programs: Program[];
}

@Component({
  selector: 'app-schedule-day-column',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScheduleProgramItemComponent],
  host: { class: 'block' },
  template: `
    <div class="space-y-8">
      <!-- Day Header -->
      <div class="flex items-baseline gap-4 text-brand-tertiary">
        <span class="text-3xl md:text-4xl font-black uppercase tracking-tight">{{
          day().dayName | translate
        }}</span>
        <span class="text-6xl font-black opacity-30">{{ day().dayNumber }}</span>
      </div>

      <!-- Programs -->
      <div class="space-y-6">
        @for (program of day().programs; track program.title) {
          <app-schedule-program-item [program]="program"></app-schedule-program-item>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDayColumnComponent {
  day = input.required<DaySchedule>();
}
