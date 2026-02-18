import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <div class="relative group">
      <button
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-tertiary/5 hover:bg-brand-tertiary/10 border border-brand-tertiary/10 transition-all text-sm font-medium text-brand-tertiary"
      >
        <span class="uppercase">{{ currentLang }}</span>
        <svg-icon name="downArrow" class="w-4 h-4" />
      </button>

      <div
        class="absolute right-0 top-full mt-2 w-32 bg-brand-tertiary/10 border border-brand-tertiary/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden"
      >
        @for (lang of langs; track lang) {
          <button
            (click)="switchLang(lang)"
            class="w-full px-4 py-2.5 text-left text-sm hover:bg-brand-tertiary/20 transition-colors flex items-center justify-between"
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
    return this.translate.getCurrentLang();
  }

  get langs() {
    return this.translate.getLangs();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
