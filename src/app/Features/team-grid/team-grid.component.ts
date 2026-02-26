import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { TranslateModule } from '@ngx-translate/core';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-team-grid',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TranslateModule],
  templateUrl: './team-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamGridComponent {
  team = signal<TeamMember[]>([
    {
      name: 'Andrés Pérez',
      role: 'Director General',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop',
    },
    {
      name: 'María García',
      role: 'Locutora Principal',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop',
    },
    {
      name: 'Juan Rodríguez',
      role: 'Productor Técnico',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop',
    },
  ]);
}
