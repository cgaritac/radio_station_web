import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { RadioService } from '../../../Core/services/radio.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [SvgIconComponent, RouterLink],
  template: `
    <a
      (click)="onLogoClick()"
      routerLink="/"
      [class]="'group flex items-center gap-2 cursor-pointer ' + className()"
    >
      <svg-icon
        name="radio"
        class="text-brand-secondary group-hover:text-brand-quaternary w-10 h-10 transition-colors pointer-events-none"
      ></svg-icon>
      <span
        class="text-xl font-bold text-brand-tertiary group-hover:text-brand-quaternary tracking-wide translate-y-[2px] pointer-events-none"
      >
        {{ radioService.radioName() }}
      </span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  radioService = inject(RadioService);
  private router = inject(Router);

  className = input<string>('');

  onLogoClick(): void {
    if (this.router.url === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
