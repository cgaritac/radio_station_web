import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '~/app/Shared/components/section-header/section-header.component';

interface Sponsor {
  name: string;
  logo: string;
  link: string;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, SectionHeaderComponent],
  templateUrl: './sponsors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SponsorsComponent {
  readonly cgc_sponsor = 'CGC Full Stack';
  readonly sponsors = signal<Sponsor[]>([
    {
      name: 'CGC Full Stack',
      logo: 'images/cgc-logo.png',
      link: (import.meta as any).env.NG_APP_CGC_URL,
    },
    { name: 'Tech Sphere', logo: 'icon:microphone', link: '#' },
    { name: 'Pure Audio', logo: 'icon:speaker', link: '#' },
    { name: 'Global Connect', logo: 'icon:link', link: '#' },
    { name: 'SPONSORS.YOUR_LOGO', logo: 'cta', link: '/contact' },
  ]);
}
