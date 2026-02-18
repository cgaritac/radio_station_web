import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from '../../Shared/components/action-button/action-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../Shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ActionButtonComponent, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}