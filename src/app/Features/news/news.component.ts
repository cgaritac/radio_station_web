import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, ActionButtonComponent],
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  activities = [
    {
      id: 'ITEM_1',
      title: 'NEWS.ACTIVITIES.ITEM_1.TITLE',
      date: 'NEWS.ACTIVITIES.ITEM_1.DATE',
      location: 'NEWS.ACTIVITIES.ITEM_1.LOCATION',
      image: 'images/news-people.jpg'
    },
    {
      id: 'ITEM_2',
      title: 'NEWS.ACTIVITIES.ITEM_2.TITLE',
      date: 'NEWS.ACTIVITIES.ITEM_2.DATE',
      location: 'NEWS.ACTIVITIES.ITEM_2.LOCATION',
      image: 'images/news-microphone.jpg'
    },
    {
      id: 'ITEM_3',
      title: 'NEWS.ACTIVITIES.ITEM_3.TITLE',
      date: 'NEWS.ACTIVITIES.ITEM_3.DATE',
      location: 'NEWS.ACTIVITIES.ITEM_3.LOCATION',
      image: 'images/news-helping.jpg'
    }
  ];
}
