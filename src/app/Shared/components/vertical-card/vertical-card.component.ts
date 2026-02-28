import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-vertical-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SvgIconComponent],
  template: `
    <article
      class="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-brand-primary/5 border border-brand-primary/5 group hover:border-brand-secondary/30 hover:shadow-brand-quaternary/50 transition-all duration-500 h-full flex flex-col"
    >
      <!-- Image -->
      <a
        [routerLink]="[baseLink(), item().categorySlug, item().id]"
        class="relative block aspect-video overflow-hidden"
      >
        <img
          [src]="item().image"
          [alt]="item().title | translate"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div class="absolute top-4 left-4">
          <span
            class="px-4 py-1.5 bg-brand-secondary text-brand-primary text-xs font-black uppercase tracking-widest rounded-full shadow-lg"
          >
            {{ item().category | translate }}
          </span>
        </div>
      </a>

      <!-- Content -->
      <div class="p-8 flex-1 flex flex-col">
        <div
          class="flex items-center gap-2 mb-4 text-brand-primary/40 text-xs font-bold uppercase tracking-widest"
        >
          <svg-icon name="calendar" class="w-4 h-4"></svg-icon>
          {{ item().date | translate }}
        </div>
        <a [routerLink]="[baseLink(), item().categorySlug, item().id]">
          <h3
            class="text-2xl font-black text-brand-primary mb-4 leading-tight hover:text-brand-quaternary transition-colors"
          >
            {{ item().title | translate }}
          </h3>
        </a>
        <p class="text-brand-primary/60 text-sm leading-relaxed mb-8 line-clamp-3">
          {{ item().excerpt | translate }}
        </p>

        <div class="mt-auto">
          <a
            [routerLink]="[baseLink(), item().categorySlug, item().id]"
            class="inline-flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest hover:text-brand-secondary transition-colors group/link cursor-pointer"
          >
            {{ 'NEWS_PAGE.READ_MORE' | translate }}
            <svg-icon
              name="arrow-right"
              class="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            ></svg-icon>
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalCardComponent {
  item = input.required<any>();
  baseLink = input.required<string>();
}
