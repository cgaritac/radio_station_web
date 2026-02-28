import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';
import { RadioService } from '../../Core/services/radio.service';

interface Program {
  title: string;
  time: string;
}

interface DaySchedule {
  dayName: string;
  dayNumber: number;
  programs: Program[];
}

interface WeekSchedule {
  id: string;
  label: string;
  days: DaySchedule[];
  color: 'green' | 'blue';
  image: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, SectionHeaderComponent],
  templateUrl: './schedule.page.html',
  styleUrl: './schedule.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePage {
  radioService = inject(RadioService);

  activeTab = signal('WEEK_1');

  weeks = signal<WeekSchedule[]>([
    {
      id: 'WEEK_1',
      label: 'SEMANA 1',
      color: 'green',
      image: 'images/radio_host_studio_green.png',
      days: [
        {
          dayName: 'JUEVES',
          dayNumber: 1,
          programs: [
            { title: 'PAN DIARIO DEL MINISTERIO JONCLEY', time: '1:30PM' },
            { title: 'TERTULIANDO CON EL INVITADO ESPECIAL', time: '3:00PM' },
          ],
        },
        {
          dayName: 'VIERNES',
          dayNumber: 2,
          programs: [
            { title: 'HABLEMOS DE FAMILIA', time: '2:00PM' },
            { title: 'NANDAYURE ZONA AZUL PARA EL MUNDO', time: '4:00PM' },
          ],
        },
      ],
    },
    {
      id: 'WEEK_2',
      label: 'SEMANA 2',
      color: 'blue',
      image: 'images/radio_host_studio_blue.png',
      days: [
        {
          dayName: 'LUNES',
          dayNumber: 5,
          programs: [
            { title: 'EXPRESIÓN MUSICAL', time: '3:00PM' },
            { title: 'HAY ESPERANZA EN JESÚS', time: '4:30PM' },
          ],
        },
        {
          dayName: 'MIÉRCOLES',
          dayNumber: 7,
          programs: [
            { title: 'EDIFICA TU VIDA', time: '2:00PM' },
            { title: 'NECESIDAD DE ORAR POR USTED', time: '3:00PM' },
          ],
        },
        {
          dayName: 'JUEVES',
          dayNumber: 8,
          programs: [{ title: 'TERTULIANDO CON EL INVITADO ESPECIAL', time: '3:00PM' }],
        },
        {
          dayName: 'VIERNES',
          dayNumber: 9,
          programs: [
            { title: 'HABLEMOS DE FAMILIA', time: '2:00PM' },
            { title: 'NANDAYURE ZONA AZUL PARA EL MUNDO', time: '4:00PM' },
          ],
        },
      ],
    },
    {
      id: 'WEEK_3',
      label: 'SEMANA 3',
      color: 'green',
      image: 'images/radio_host_studio_green.png',
      days: [
        {
          dayName: 'LUNES',
          dayNumber: 12,
          programs: [{ title: 'HAY ESPERANZA EN JESÚS', time: '4:30PM' }],
        },
        {
          dayName: 'MIÉRCOLES',
          dayNumber: 14,
          programs: [
            { title: 'EDIFICA TU VIDA', time: '2:00PM' },
            { title: 'NECESIDAD DE ORAR POR USTED', time: '3:00PM' },
          ],
        },
        {
          dayName: 'JUEVES',
          dayNumber: 15,
          programs: [{ title: 'TERTULIANDO CON EL INVITADO ESPECIAL', time: '3:00PM' }],
        },
        {
          dayName: 'VIERNES',
          dayNumber: 16,
          programs: [
            { title: 'HABLEMOS DE FAMILIA', time: '2:00PM' },
            { title: 'NANDAYURE ZONA AZUL PARA EL MUNDO', time: '4:00PM' },
          ],
        },
        {
          dayName: 'SÁBADO',
          dayNumber: 17,
          programs: [{ title: 'EL MENSAJE INCREÍBLE DE LA BIBLIA', time: '3:00PM' }],
        },
      ],
    },
    {
      id: 'WEEK_4',
      label: 'SEMANA 4',
      color: 'blue',
      image: 'images/radio_host_studio_blue.png',
      days: [
        {
          dayName: 'LUNES',
          dayNumber: 19,
          programs: [
            { title: 'EXPRESIÓN MUSICAL', time: '3:00PM' },
            { title: 'HAY ESPERANZA EN JESÚS', time: '4:30PM' },
          ],
        },
        {
          dayName: 'MIÉRCOLES',
          dayNumber: 21,
          programs: [
            { title: 'EDIFICA TU VIDA', time: '2:00PM' },
            { title: 'NECESIDAD DE ORAR POR USTED', time: '3:00PM' },
          ],
        },
        {
          dayName: 'JUEVES',
          dayNumber: 22,
          programs: [{ title: 'TERTULIANDO CON EL INVITADO ESPECIAL', time: '3:00PM' }],
        },
        {
          dayName: 'VIERNES',
          dayNumber: 23,
          programs: [
            { title: 'HABLEMOS DE FAMILIA', time: '2:00PM' },
            { title: 'NANDAYURE ZONA AZUL PARA EL MUNDO', time: '4:00PM' },
          ],
        },
      ],
    },
  ]);

  currentWeek = () => this.weeks().find((w) => w.id === this.activeTab());

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}
