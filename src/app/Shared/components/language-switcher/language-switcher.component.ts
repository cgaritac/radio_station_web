import {
  Component,
  inject,
  HostListener,
  ElementRef,
  signal,
  effect,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  template: `
    <div class="relative">
      <button
        (click)="toggleMenu()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-brand-tertiary/10 hover:bg-brand-tertiary/10 backdrop-blur-md border border-brand-tertiary/10 transition-all text-sm font-medium text-brand-tertiary cursor-pointer"
      >
        <span class="uppercase">{{ currentLang }}</span>
        <svg-icon
          name="downArrow"
          class="w-4 h-4 transition-transform duration-300"
          [class.rotate-180]="isOpen()"
        />
      </button>

      <div
        class="absolute right-0 top-full mt-3.5 w-40 border border-brand-tertiary/10 rounded-2xl shadow-2xl transition-all duration-200 z-50 overflow-hidden lang-dropdown-panel"
        [class.opacity-100]="isOpen()"
        [class.visible]="isOpen()"
        [class.opacity-0]="!isOpen()"
        [class.invisible]="!isOpen()"
        [class.translate-y-0]="isOpen()"
        [class.-translate-y-2]="!isOpen()"
      >
        @for (lang of langs; track lang) {
          <button
            (click)="switchLang(lang)"
            class="w-full px-4 py-2.5 text-left text-sm hover:bg-brand-tertiary/20 transition-colors flex items-center justify-between cursor-pointer"
            [class.text-brand-secondary]="lang === currentLang"
            [class.text-brand-tertiary]="lang !== currentLang"
          >
            <span class="font-bold">{{ 'LANG.' + (lang | uppercase) | translate }}</span>
            @if (lang === currentLang) {
              <div class="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></div>
            }
          </button>
        }
      </div>
    </div>
  `,
})
export class LanguageSwitcherComponent implements OnDestroy {
  private translate = inject(TranslateService);
  private el = inject(ElementRef);
  isOpen = signal(false);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        document.body.classList.add('lang-menu-open');
      } else {
        document.body.classList.remove('lang-menu-open');
      }
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('lang-menu-open');
  }

  get currentLang() {
    return this.translate.getCurrentLang();
  }

  get langs() {
    return this.translate.getLangs();
  }

  toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('user_lang', lang);
    this.isOpen.set(false);
  }
}
