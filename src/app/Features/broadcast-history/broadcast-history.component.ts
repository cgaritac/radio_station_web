import { Component, OnInit, inject, Signal, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  BroadcastHistoryService,
  BroadcastHistoryEntry,
} from '../../Core/services/broadcast-history.service';
import { RadioService } from '../../Core/services/radio.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { SectionHeaderComponent } from '../../Shared/components/section-header/section-header.component';

@Component({
  selector: 'app-broadcast-history',
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent, SectionHeaderComponent],
  templateUrl: './broadcast-history.component.html',
  styleUrls: ['./broadcast-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastHistoryComponent implements OnInit {
  private readonly broadcastHistoryService = inject(BroadcastHistoryService);
  protected readonly radioService = inject(RadioService);

  readonly broadcastHistory = signal<BroadcastHistoryEntry[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadBroadcastHistory();
  }

  loadBroadcastHistory(): void {
    this.isLoading.set(true);
    this.broadcastHistoryService.getBroadcastHistory().subscribe({
      next: (data) => {
        this.broadcastHistory.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading broadcast history:', err);
        this.error.set('Could not load broadcast history');
        this.isLoading.set(false);
      },
    });
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
}
