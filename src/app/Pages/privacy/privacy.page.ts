import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './privacy.page.html',
  styleUrl: './privacy.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {}
