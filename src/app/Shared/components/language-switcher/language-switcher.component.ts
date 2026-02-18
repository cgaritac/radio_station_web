import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group">
      <button
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-brand-tertiary"
      >
        <span class="uppercase">{{ currentLang }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform group-hover:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        class="absolute right-0 top-full mt-2 w-32 bg-brand-primary border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden"
      >
        @for (lang of langs; track lang) {
          <button
            (click)="switchLang(lang)"
            class="w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors flex items-center justify-between"
            [class.text-brand-secondary]="lang === currentLang"
            [class.text-gray-300]="lang !== currentLang"
          >
            <span class="uppercase font-bold">{{ lang }}</span>
            @if (lang === currentLang) {
              <div class="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></div>
            }
          </button>
        }
      </div>
    </div>
  `
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);

  get currentLang() {
    return this.translate.currentLang;
  }

  get langs() {
    return this.translate.getLangs();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
