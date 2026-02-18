
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="tracking-wide px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer hover:opacity-90"
      [ngClass]="[bgColor, textColor]"
    >
      <!-- Pulse dot -->
      @if (showPulse) {
        <span class="w-2 h-2 rounded-full animate-pulse bg-current"></span>
      }
      
      <!-- Content/Label -->
      <ng-content></ng-content>
      {{ label }}
    </button>
  `,
  styles: []
})
export class ActionButtonComponent {
  @Input() label: string = '';
  @Input() bgColor: string = 'bg-brand-secondary';
  @Input() textColor: string = 'text-brand-primary';
  @Input() showPulse: boolean = false;
}
