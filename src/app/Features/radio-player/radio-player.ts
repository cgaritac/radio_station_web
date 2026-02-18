import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-radio-player',
  imports: [SvgIconComponent, TranslateModule],
  standalone: true,
  templateUrl: './radio-player.html',
  styleUrl: './radio-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPlayer {
    protected readonly radioService = inject(RadioService);
}
