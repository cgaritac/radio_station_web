import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Sponsor {
  name: string;
  logo: string;
  link: string;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sponsors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorsComponent {
  readonly sponsors = signal<Sponsor[]>([
    { name: 'Sponsor 1', logo: 'images/sponsor_placeholder.png', link: '#' },
    { name: 'Sponsor 2', logo: 'images/sponsor_placeholder.png', link: '#' },
    { name: 'Sponsor 3', logo: 'images/sponsor_placeholder.png', link: '#' },
    { name: 'Sponsor 4', logo: 'images/sponsor_placeholder.png', link: '#' },
    { name: 'SPONSORS.YOUR_LOGO', logo: 'cta', link: '/contact' },
  ]);
}
