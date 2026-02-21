import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RadioService } from '../../Core/services/radio.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent, TranslateModule, RouterLink],
})
export class FooterComponent {
  radioService = inject(RadioService);
  protected readonly currentYear = new Date().getFullYear();
}
