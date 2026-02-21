import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { BannerComponent } from '../../Shared/components/banner/banner.component';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, BannerComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage {
  team = signal<TeamMember[]>([
    {
      name: 'Andrés Pérez',
      role: 'Director General',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop'
    },
    {
      name: 'María García',
      role: 'Locutora Principal',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop'
    },
    {
      name: 'Juan Rodríguez',
      role: 'Productor Técnico',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop'
    }
  ]);
}
