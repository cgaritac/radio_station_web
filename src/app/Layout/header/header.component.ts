import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LogoComponent } from '../../Shared/components/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
