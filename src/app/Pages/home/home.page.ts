import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RadioService } from '../../Core/services/radio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly radioService = inject(RadioService);
}
