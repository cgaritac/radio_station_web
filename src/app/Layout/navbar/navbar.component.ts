import { Component, ChangeDetectionStrategy, signal, HostListener, effect, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from '~/app/Shared/components/action-button/action-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '~/app/Shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ActionButtonComponent, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy {
  isMenuOpen = signal(false);

  constructor() {
    effect(() => {
      if (this.isMenuOpen()) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('mobile-menu-open');
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideHamburger = !!target.closest('.hamburger-trigger') || !!target.closest('.mobile-menu-panel');
    
    if (!isInsideHamburger) {
      this.isMenuOpen.set(false);
    }
  }
}