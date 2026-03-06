import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalCardComponent } from '~/app/Shared/components/vertical-card/vertical-card.component';

@Component({
  selector: 'app-news-grid',
  standalone: true,
  imports: [CommonModule, VerticalCardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      @for (item of items(); track item.id) {
        <app-vertical-card [item]="item" baseLink="/news"></app-vertical-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsGridComponent {
  items = input.required<any[]>();
}
