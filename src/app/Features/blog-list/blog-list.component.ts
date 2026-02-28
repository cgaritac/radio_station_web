import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalCardComponent } from '../../Shared/components/horizontal-card/horizontal-card.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, HorizontalCardComponent],
  template: `
    <div class="flex flex-col gap-16">
      @for (post of items(); track post.id) {
        <app-horizontal-card
          [item]="post"
          baseLink="/blog"
          readMoreLabel="BLOG_PAGE.READ_ARTICLE"
        ></app-horizontal-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {
  items = input.required<any[]>();
}
