import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyCardComponent } from '~/app/Shared/components/study-card/study-card.component';

@Component({
  selector: 'app-studies-list',
  standalone: true,
  imports: [CommonModule, StudyCardComponent],
  template: `
    <div class="flex flex-col gap-8">
      @for (item of items(); track item.id) {
        <app-study-card [item]="item"></app-study-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesListComponent {
  items = input.required<any[]>();
}
