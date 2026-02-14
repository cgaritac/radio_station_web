import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly iconRegistry = inject(SvgIconRegistryService);

  private icons = [
    { name: 'play', path: 'icons/play.svg' },
    { name: 'pause', path: 'icons/pause.svg' },
    { name: 'volume', path: 'icons/volume.svg' }
  ];

  preloadIcons(): void {
    this.icons.forEach(icon => {
      this.iconRegistry.loadSvg(icon.path, icon.name)?.subscribe();
    });
  }
}
