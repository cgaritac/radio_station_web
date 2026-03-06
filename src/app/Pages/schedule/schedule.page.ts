import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';
import { RadioService } from '~/app/Core/services/radio.service';
import { ScheduleTabsComponent } from '~/app/Shared/components/schedule-tabs/schedule-tabs.component';
import {
  ScheduleCardComponent,
  WeekSchedule,
} from '~/app/Features/schedule-card/schedule-card.component';
import { SeoService } from '~/app/Core/services/seo.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SectionHeaderComponent,
    ScheduleTabsComponent,
    ScheduleCardComponent,
  ],
  templateUrl: './schedule.page.html',
  styleUrl: './schedule.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePage implements OnInit {
  radioService = inject(RadioService);
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetaTags({
      titleKey: 'SEO.SCHEDULE_TITLE',
      descriptionKey: 'SEO.SCHEDULE_DESCRIPTION',
    });
  }

  activeTab = signal('WEEK_1');

  weeks = signal<WeekSchedule[]>([
    {
      id: 'WEEK_1',
      label: 'SCHEDULE_PAGE.WEEKS.WEEK_1',
      color: 'green',
      image: 'images/radio_host_studio_green.png',
      days: [
        {
          dayName: 'SCHEDULE_PAGE.DAYS.THURSDAY',
          dayNumber: 1,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.JONCLEY', time: '1:30PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.TERTULIANDO', time: '3:00PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.FRIDAY',
          dayNumber: 2,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.FAMILY', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.ZONE_PROGRAM', time: '4:00PM' },
          ],
        },
      ],
    },
    {
      id: 'WEEK_2',
      label: 'SCHEDULE_PAGE.WEEKS.WEEK_2',
      color: 'blue',
      image: 'images/radio_host_studio_blue.png',
      days: [
        {
          dayName: 'SCHEDULE_PAGE.DAYS.MONDAY',
          dayNumber: 5,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.EXPRESSION', time: '3:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.HOPE', time: '4:30PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.WEDNESDAY',
          dayNumber: 7,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.EDIFICA', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.PRAYER', time: '3:00PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.THURSDAY',
          dayNumber: 8,
          programs: [{ title: 'SCHEDULE_PAGE.PROGRAMS.TERTULIANDO', time: '3:00PM' }],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.FRIDAY',
          dayNumber: 9,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.FAMILY', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.ZONE_PROGRAM', time: '4:00PM' },
          ],
        },
      ],
    },
    {
      id: 'WEEK_3',
      label: 'SCHEDULE_PAGE.WEEKS.WEEK_3',
      color: 'green',
      image: 'images/radio_host_studio_green.png',
      days: [
        {
          dayName: 'SCHEDULE_PAGE.DAYS.MONDAY',
          dayNumber: 12,
          programs: [{ title: 'SCHEDULE_PAGE.PROGRAMS.HOPE', time: '4:30PM' }],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.WEDNESDAY',
          dayNumber: 14,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.EDIFICA', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.PRAYER', time: '3:00PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.THURSDAY',
          dayNumber: 15,
          programs: [{ title: 'SCHEDULE_PAGE.PROGRAMS.TERTULIANDO', time: '3:00PM' }],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.FRIDAY',
          dayNumber: 16,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.FAMILY', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.ZONE_PROGRAM', time: '4:00PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.SATURDAY',
          dayNumber: 17,
          programs: [{ title: 'SCHEDULE_PAGE.PROGRAMS.MESSAGE', time: '3:00PM' }],
        },
      ],
    },
    {
      id: 'WEEK_4',
      label: 'SCHEDULE_PAGE.WEEKS.WEEK_4',
      color: 'blue',
      image: 'images/radio_host_studio_blue.png',
      days: [
        {
          dayName: 'SCHEDULE_PAGE.DAYS.MONDAY',
          dayNumber: 19,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.EXPRESSION', time: '3:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.HOPE', time: '4:30PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.WEDNESDAY',
          dayNumber: 21,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.EDIFICA', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.PRAYER', time: '3:00PM' },
          ],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.THURSDAY',
          dayNumber: 22,
          programs: [{ title: 'SCHEDULE_PAGE.PROGRAMS.TERTULIANDO', time: '3:00PM' }],
        },
        {
          dayName: 'SCHEDULE_PAGE.DAYS.FRIDAY',
          dayNumber: 23,
          programs: [
            { title: 'SCHEDULE_PAGE.PROGRAMS.FAMILY', time: '2:00PM' },
            { title: 'SCHEDULE_PAGE.PROGRAMS.ZONE_PROGRAM', time: '4:00PM' },
          ],
        },
      ],
    },
  ]);

  currentWeek = computed(() => this.weeks().find((w) => w.id === this.activeTab()));

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}
