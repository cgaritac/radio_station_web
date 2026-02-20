import { Component, OnInit, inject, Signal, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleService, ScheduleEntry } from '../../Core/services/schedule.service';
import { RadioService } from '../../Core/services/radio.service';
import { IconRegistryService } from '../../Core/services/icon-registry.service';
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {
  private readonly scheduleService = inject(ScheduleService);
  protected readonly radioService = inject(RadioService);
  
  readonly schedule = signal<ScheduleEntry[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.isLoading.set(true);
    this.scheduleService.getSchedule().subscribe({
      next: (data) => {
        this.schedule.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading schedule:', err);
        this.error.set('Could not load schedule');
        this.isLoading.set(false);
      }
    });
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
}
