import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly iconRegistry = inject(SvgIconRegistryService);

  // Lista de iconos esenciales para tu radio
  private icons = [
    { name: 'play', path: 'icons/play.svg' },
    { name: 'pause', path: 'icons/pause.svg' },
    { name: 'volume', path: 'icons/volume.svg' }
  ];

  preloadIcons(): void {
    this.icons.forEach(icon => {
      // Esto descarga el SVG y lo guarda en la memoria del registro
      this.iconRegistry.loadSvg(icon.path, icon.name)?.subscribe();
    });
  }
}
