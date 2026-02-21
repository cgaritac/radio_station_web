import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import {
  DetailModalComponent,
  ModalDetail,
} from '../../Shared/components/detail-modal/detail-modal.component';

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SvgIconComponent,
    ActionButtonComponent,
    SectionHeaderComponent,
    DetailModalComponent,
  ],
  templateUrl: './community.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityComponent {
  private translate = inject(TranslateService);

  activities: Activity[] = [
    {
      id: 'ITEM_1',
      title: 'COMMUNITY.ACTIVITIES.ITEM_1.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_1.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_1.LOCATION',
      description: 'COMMUNITY.ACTIVITIES.ITEM_1.DESCRIPTION',
      image: 'images/community-people.jpg',
    },
    {
      id: 'ITEM_2',
      title: 'COMMUNITY.ACTIVITIES.ITEM_2.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_2.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_2.LOCATION',
      description: 'COMMUNITY.ACTIVITIES.ITEM_2.DESCRIPTION',
      image: 'images/community-microphone.jpg',
    },
    {
      id: 'ITEM_3',
      title: 'COMMUNITY.ACTIVITIES.ITEM_3.TITLE',
      date: 'COMMUNITY.ACTIVITIES.ITEM_3.DATE',
      location: 'COMMUNITY.ACTIVITIES.ITEM_3.LOCATION',
      description: 'COMMUNITY.ACTIVITIES.ITEM_3.DESCRIPTION',
      image: 'images/community-helping.jpg',
    },
  ];

  selectedActivity = signal<Activity | null>(null);

  openActivity(activity: Activity) {
    this.selectedActivity.set(activity);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedActivity.set(null);
    document.body.style.overflow = 'auto';
  }

  getActivityDetails(activity: Activity): ModalDetail[] {
    return [
      { icon: 'clock', text: this.translate.instant(activity.date) },
      { icon: 'location', text: this.translate.instant(activity.location) },
    ];
  }

  getWhatsAppLink(activity: Activity): string {
    const baseUrl = 'https://wa.me/50612345678'; // Use the phone number from footer/config
    const baseMessage = this.translate.instant('COMMUNITY.MODAL.WHATSAPP_MESSAGE');
    const title = this.translate.instant(activity.title);
    const fullMessage = encodeURIComponent(`${baseMessage}${title}`);
    return `${baseUrl}?text=${fullMessage}`;
  }
}
