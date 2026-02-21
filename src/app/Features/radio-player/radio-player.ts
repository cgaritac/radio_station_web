import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { RadioService } from '../../Core/services/radio.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-radio-player',
  imports: [SvgIconComponent, TranslateModule, NgClass],
  standalone: true,
  templateUrl: './radio-player.html',
  styleUrl: './radio-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPlayer {
    protected readonly radioService = inject(RadioService);
    protected readonly isMobileExpanded = signal(false);

    protected toggleMobileExpanded(): void {
        this.isMobileExpanded.update(v => !v);
    }
}
