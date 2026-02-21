import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {}
