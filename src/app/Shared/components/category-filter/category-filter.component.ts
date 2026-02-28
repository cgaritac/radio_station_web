import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface Category {
  slug: string;
  label: string;
}

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="flex flex-wrap justify-center gap-4 mb-20">
      <a
        [routerLink]="[basePath()]"
        class="px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border"
        [ngClass]="
          selectedSlug() === 'all'
            ? 'bg-brand-secondary text-brand-primary border-brand-secondary shadow-lg shadow-brand-secondary/20'
            : 'bg-transparent text-brand-primary/40 border-brand-primary/10 hover:border-brand-quaternary hover:text-brand-primary/65 hover:bg-brand-quaternary/20'
        "
      >
        {{ allLabel() | translate }}
      </a>
      @for (cat of categories(); track cat.slug) {
        <a
          [routerLink]="[basePath() + '/category', cat.slug]"
          class="px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border"
          [ngClass]="
            selectedSlug() === cat.slug
              ? 'bg-brand-secondary text-brand-primary border-brand-secondary shadow-lg shadow-brand-secondary/20'
              : 'bg-transparent text-brand-primary/40 border-brand-primary/10 hover:border-brand-quaternary hover:text-brand-primary/65 hover:bg-brand-quaternary/20'
          "
        >
          {{ cat.label | translate }}
        </a>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  basePath = input.required<string>();
  categories = input.required<Category[]>();
  selectedSlug = input.required<string>();
  allLabel = input.required<string>();
}
