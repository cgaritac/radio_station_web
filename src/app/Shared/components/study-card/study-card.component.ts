import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-study-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SvgIconComponent],
  template: `
    <article
      class="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-brand-primary/5 border border-brand-primary/5 group hover:border-brand-quaternary/50 hover:shadow-brand-quaternary/20 hover:scale-102 transition-all duration-500 p-4 md:p-6"
    >
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <!-- Thumbnail/Icon Area -->
        <a
          [routerLink]="['/studies', item().categorySlug, item().id]"
          class="relative w-full md:w-64 aspect-video md:aspect-square shrink-0 rounded-[32px] overflow-hidden shadow-lg block group/img"
        >
          <img
            [src]="item().image"
            [alt]="item().title | translate"
            class="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
          />
          <div
            class="absolute inset-0 bg-brand-primary/10 group-hover/img:bg-transparent transition-colors"
          ></div>
          <!-- Mini play button -->
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
          >
            <div
              class="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-primary shadow-xl scale-75 group-hover/img:scale-100 transition-transform"
            >
              <svg-icon name="speaker" class="w-6 h-6"></svg-icon>
            </div>
          </div>
        </a>

        <!-- Text Content Area -->
        <div class="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              [routerLink]="['/studies/category', item().categorySlug]"
              class="px-4 py-1.5 text-brand-quaternary/80 border border-brand-quaternary/30 text-xs font-black uppercase tracking-widest rounded-full hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300"
            >
              {{ item().category | translate }}
            </a>
            <div
              class="flex items-center gap-2 text-brand-primary/30 text-xs font-bold uppercase tracking-widest"
            >
              <svg-icon name="radio" class="w-4 h-4"></svg-icon>
              {{ item().series | translate }}
            </div>
          </div>

          <a [routerLink]="['/studies', item().categorySlug, item().id]">
            <h3
              class="text-2xl md:text-3xl font-black text-brand-primary leading-tight hover:text-brand-quaternary transition-colors"
            >
              {{ item().title | translate }}
            </h3>
          </a>

          <p class="text-brand-primary/60 text-base leading-relaxed line-clamp-2 md:line-clamp-3">
            {{ item().excerpt | translate }}
          </p>

          <div class="pt-2 flex justify-center md:justify-start">
            <a
              [routerLink]="['/studies', item().categorySlug, item().id]"
              class="inline-flex items-center gap-3 text-brand-primary font-black text-xs uppercase tracking-widest hover:text-brand-secondary transition-all group/link cursor-pointer"
            >
              <span
                class="underline decoration-brand-secondary/30 underline-offset-4 group-hover/link:decoration-brand-secondary transition-all"
              >
                {{ 'STUDIES_PAGE.READ_MORE' | translate }}
              </span>
              <div
                class="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover/link:bg-brand-secondary transition-colors"
              >
                <svg-icon
                  name="arrow-right"
                  class="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:text-brand-primary transition-transform"
                ></svg-icon>
              </div>
            </a>
          </div>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyCardComponent {
  item = input.required<any>();
}
