import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LogoComponent } from '../../Shared/components/logo/logo.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent, SvgIconComponent, TranslateModule, RouterLink],
})
export class FooterComponent {
  radioService = inject(RadioService);
  private router = inject(Router);
  protected readonly currentYear = new Date().getFullYear();

  scrollToTop(event: MouseEvent, path: string) {
    if (this.router.url === path) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
