import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, ActionButtonComponent],
  templateUrl: './community.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityComponent {
  activities = [
    {
      id: 'ITEM_1',
      title: 'COMMUNITY.ACTIVITIES.ITEM_1.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_1.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_1.LOCATION',
      image: 'images/community-people.jpg'
    },
    {
      id: 'ITEM_2',
      title: 'COMMUNITY.ACTIVITIES.ITEM_2.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_2.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_2.LOCATION',
      image: 'images/community-microphone.jpg'
    },
    {
      id: 'ITEM_3',
      title: 'COMMUNITY.ACTIVITIES.ITEM_3.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_3.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_3.LOCATION',
      image: 'images/community-helping.jpg'
    }
  ];
}
