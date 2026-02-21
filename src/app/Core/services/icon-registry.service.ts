import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ICONS } from '../constants/icons';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly iconRegistry = inject(SvgIconRegistryService);

  /**
   * Preloads and registers all SVG icons from the ICONS constants.
   * This approach (inlining) improves performance by reducing HTTP requests
   * and ensuring icons are available instantly upon first render.
   */
  preloadIcons(): void {
    Object.entries(ICONS).forEach(([name, svg]) => {
      this.iconRegistry.addSvg(name, svg);
    });
  }
}
