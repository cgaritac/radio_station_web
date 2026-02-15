import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SvgIconComponent } from "angular-svg-icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, SvgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
}
