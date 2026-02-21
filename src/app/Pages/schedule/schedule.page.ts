import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  host: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent],
  templateUrl: './schedule.page.html',
  styleUrl: './schedule.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulePage {
  activeTab = signal('MON_FRI');

  scheduleItems = signal<ScheduleItem[]>([
    {
      id: '1',
      title: 'SCHEDULE_PAGE.ITEMS.MORNING_PRAYER.TITLE',
      time: 'SCHEDULE_PAGE.ITEMS.MORNING_PRAYER.TIME',
      host: 'SCHEDULE_PAGE.ITEMS.MORNING_PRAYER.HOST'
    },
    {
      id: '2',
      title: 'SCHEDULE_PAGE.ITEMS.FAITH_MUSIC.TITLE',
      time: 'SCHEDULE_PAGE.ITEMS.FAITH_MUSIC.TIME',
      host: 'SCHEDULE_PAGE.ITEMS.FAITH_MUSIC.HOST'
    },
    {
      id: '3',
      title: 'SCHEDULE_PAGE.ITEMS.BIBLE_STUDY.TITLE',
      time: 'SCHEDULE_PAGE.ITEMS.BIBLE_STUDY.TIME',
      host: 'SCHEDULE_PAGE.ITEMS.BIBLE_STUDY.HOST'
    },
    {
      id: '4',
      title: 'SCHEDULE_PAGE.ITEMS.YOUTH_NIGHT.TITLE',
      time: 'SCHEDULE_PAGE.ITEMS.YOUTH_NIGHT.TIME',
      host: 'SCHEDULE_PAGE.ITEMS.YOUTH_NIGHT.HOST'
    }
  ]);

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}
