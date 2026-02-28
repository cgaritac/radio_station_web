import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SvgIconComponent],
  template: `
    <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
      <!-- Image Area -->
      <a
        [routerLink]="[baseLink(), item().categorySlug, item().id]"
        class="relative block overflow-hidden rounded-[40px] aspect-video lg:aspect-square shadow-2xl shadow-brand-primary/5 border border-brand-primary/5 group"
      >
        <img
          [src]="item().image"
          [alt]="item().title | translate"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div class="absolute inset-0 bg-linear-to-t from-brand-primary/40 to-transparent"></div>
      </a>

      <!-- Content Area -->
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-4">
          <a
            [routerLink]="[baseLink() + '/category', item().categorySlug]"
            class="px-4 py-1.5 text-brand-quaternary text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-quaternary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300"
          >
            {{ item().category | translate }}
          </a>

          <span class="w-1.5 h-1.5 rounded-full bg-brand-primary/10"></span>
          <span class="text-xs font-bold text-brand-primary/40 uppercase tracking-widest">
            {{ 'BLOG_PAGE.AUTHOR' | translate }} {{ item().author }}
          </span>
        </div>

        <a [routerLink]="[baseLink(), item().categorySlug, item().id]">
          <h3
            class="text-3xl md:text-4xl font-black text-brand-primary leading-tight hover:text-brand-quaternary transition-colors duration-300"
          >
            {{ item().title | translate }}
          </h3>
        </a>

        <p class="text-brand-primary/60 text-lg leading-relaxed line-clamp-3">
          {{ item().excerpt | translate }}
        </p>

        <div class="pt-4">
          <a
            [routerLink]="[baseLink(), item().categorySlug, item().id]"
            class="inline-flex items-center gap-4 group/btn cursor-pointer"
          >
            <div
              class="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary shadow-lg shadow-brand-secondary/20 group-hover/btn:scale-110 transition-all"
            >
              <svg-icon name="arrow-right" class="w-5 h-5"></svg-icon>
            </div>
            <span class="font-black text-xs uppercase tracking-widest text-brand-primary">
              {{ readMoreLabel() | translate }}
            </span>
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalCardComponent {
  item = input.required<any>();
  baseLink = input.required<string>();
  readMoreLabel = input.required<string>();
}
