import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SvgIconComponent } from "angular-svg-icon";
import { RadioService } from '../../Core/services/radio.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, SvgIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  radioService = inject(RadioService);
}
