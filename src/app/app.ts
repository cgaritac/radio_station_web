import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Layout/footer/footer.component';
import { HeaderComponent } from "./Layout/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
