import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-radio-player',
  imports: [SvgIconComponent],
  standalone: true,
  templateUrl: './radio-player.html',
  styleUrl: './radio-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPlayer {

}
