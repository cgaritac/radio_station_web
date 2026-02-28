import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  ScheduleDayColumnComponent,
  DaySchedule,
} from '../../Shared/components/schedule-day-column/schedule-day-column.component';
import { ScheduleBrandingComponent } from '../../Shared/components/schedule-branding/schedule-branding.component';

export interface WeekSchedule {
  id: string;
  label: string;
  days: DaySchedule[];
  color: 'green' | 'blue';
  image: string;
}

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScheduleDayColumnComponent, ScheduleBrandingComponent],
  template: `
    <div
      class="group/card rounded-[64px] overflow-hidden shadow-2xl transition-all duration-700"
      [ngClass]="week()?.color === 'green' ? 'bg-brand-quaternary' : 'bg-brand-primary'"
    >
      <div class="flex flex-col lg:flex-row min-h-[700px] relative">
        <!-- Side Label (Desktop) -->
        <div
          class="hidden lg:flex items-center justify-center p-12 lg:p-16 border-r border-brand-tertiary/10"
        >
          <h2
            class="text-8xl font-black text-brand-tertiary/10 whitespace-nowrap rotate-180 [writing-mode:vertical-lr] tracking-tighter uppercase italic"
          >
            {{ week()?.label | translate }}
          </h2>
        </div>

        <!-- Programs List -->
        <div class="flex-1 p-8 md:p-16 lg:p-20 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            @for (day of week()?.days; track day.dayNumber) {
              <app-schedule-day-column [day]="day"></app-schedule-day-column>
            }
          </div>

          <!-- Host Image Section -->
          <div
            class="mt-20 lg:mt-32 relative h-[300px] md:h-[400px] -mx-8 md:-mx-16 lg:-mx-20 -mb-8 md:-mb-16 lg:-mb-20 overflow-hidden"
          >
            <div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10"></div>
            @if (week()?.image) {
              <img
                [src]="week()?.image"
                class="w-full h-full object-cover object-center transform scale-110 group-hover/card:scale-100 transition-transform duration-1000"
                alt="Radio Hosts"
              />
            }
            <!-- Decorative curved overlay -->
            <div
              class="absolute -top-1 left-0 right-0 h-24 bg-linear-to-b z-20"
              [ngClass]="week()?.color === 'green' ? 'from-brand-quaternary' : 'from-brand-primary'"
            ></div>
          </div>
        </div>

        <!-- Floating Branding -->
        <app-schedule-branding [radioName]="radioName()"></app-schedule-branding>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCardComponent {
  week = input.required<WeekSchedule | undefined>();
  radioName = input.required<string>();
}
