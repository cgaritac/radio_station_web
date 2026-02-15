import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-radio-player',
  imports: [SvgIconComponent],
  standalone: true,
  templateUrl: './radio-player.html',
  styleUrl: './radio-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPlayer {
    protected readonly radioService = inject(RadioService);
}
