import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RadioPlayer } from './Features/radio-player/radio-player';
import { FooterComponent } from './Layout/footer/footer.component';
import { HeaderComponent } from './Layout/header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from './Core/services/analytics.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    RadioPlayer,
    TranslateModule,
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private analytics = inject(AnalyticsService);
  isScrolled = false;

  constructor() {
    this.translate.addLangs(['es', 'en']);
  }

  ngOnInit() {
    this.analytics.init();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
