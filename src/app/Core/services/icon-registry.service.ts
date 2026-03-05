import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ICONS } from '~/app/Core/constants/icons';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly iconRegistry = inject(SvgIconRegistryService);

  /**
   * Preloads and registers all SVG icons from the ICONS constants.
   */
  preloadIcons(): void {
    Object.entries(ICONS).forEach(([name, svg]) => {
      this.iconRegistry.addSvg(name, svg);
    });
  }
}
