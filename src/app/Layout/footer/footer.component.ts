import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RadioService } from '../../Core/services/radio.service';
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent]
})
export class FooterComponent {
  radioService = inject(RadioService);
  protected readonly currentYear = new Date().getFullYear();
}
