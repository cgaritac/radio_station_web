import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, ActionButtonComponent],
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  activities = [
    {
      title: 'Culto Unido de Oración',
      date: '15 DE OCTUBRE, 2026',
      location: 'Plaza Central, Nandayure',
      image: 'images/news-people.jpg'
    },
    {
      title: 'Reunión de Jóvenes: "Fe Activa"',
      date: '22 DE OCTUBRE, 2026',
      location: 'Auditorio Municipal',
      image: 'images/news-microphone.jpg'
    },
    {
      title: 'Campaña de Ayuda Social',
      date: '02 DE NOVIEMBRE, 2026',
      location: 'Barrio La Esperanza',
      image: 'images/news-helping.jpg'
    }
  ];
}
